export const report = ({from, to}) => `Use character class instead of single character alternation: '${from}' -> '${to}'`;

export const fix = ({path, left, right}) => {
    if (left.type === 'CharacterClass') {
        right.escaped = false;
        
        return path.replace({
            type: 'CharacterClass',
            expressions: [
                ...left.expressions,
                right,
            ],
        });
    }
    
    left.escaped = false;
    right.escaped = false;
    
    if (path.parentPath.node.type === 'Group') {
        path.parentPath.replace({
            type: 'CharacterClass',
            expressions: [left, right],
        });
        return;
    }
    
    path.replace({
        type: 'CharacterClass',
        expressions: [left, right],
    });
    return;
};

export const traverse = ({push}) => ({
    Disjunction(path) {
        const {left, right} = path.node;
        
        if (right.type !== 'Char' || right.value.length !== 1)
            return;
        
        if (left.type === 'CharacterClass')
            push({
                path,
                left,
                right,
            });
        
        if (left.type !== 'Char' || left.value.length !== 1)
            return;
        
        push({
            path,
            left,
            right,
        });
    },
});
