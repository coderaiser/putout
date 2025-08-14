import regexpTree from 'regexp-tree';

export const report = ({from, to}) => `Use character class instead of single character alternation: '${from}' -> '${to}'`;

export const fix = ({path, to}) => {
    const [, pattern] = to.split('/');
    
    path.node.pattern = pattern;
    path.node.raw = to;
    path.node.extra.raw = to;
};

export const traverse = ({push}) => ({
    RegExpLiteral(path) {
        const from = path.node.extra.raw;
        const [is, to] = applyCharacterClass(from);
        
        if (!is)
            return;
        
        push({
            path,
            from,
            to,
        });
    },
});

function applyCharacterClass(str) {
    const ast = regexpTree.parse(str);
    let is = false;
    
    regexpTree.traverse(ast, {
        Disjunction(path) {
            const {left, right} = path.node;
            
            if (right.type !== 'Char' || right.value.length !== 1)
                return;
            
            if (left.type === 'CharacterClass') {
                is = true;
                
                return path.replace({
                    type: 'CharacterClass',
                    expressions: [
                        ...left.expressions,
                        right,
                    ],
                });
            }
            
            if (left.type !== 'Char' || left.value.length !== 1)
                return;
            
            is = true;
            path.replace({
                type: 'CharacterClass',
                expressions: [left, right],
            });
        },
    });
    
    return [is, regexpTree.generate(ast)];
}
