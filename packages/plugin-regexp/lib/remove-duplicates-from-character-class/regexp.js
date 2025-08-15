export const report = () => 'Remove duplicates from character class';
export const fix = ({path, j}) => delete path.node.expressions[j];
export const traverse = ({push}) => ({
    CharacterClass(path) {
        const {expressions} = path.node;
        
        for (const [i, a] of expressions.entries()) {
            for (const [j, b] of expressions.entries()) {
                if (i === j)
                    continue;
                
                if (!a || !b)
                    continue;
                
                if (a.value === b.value)
                    push({
                        j,
                        path,
                    });
            }
        }
    },
});
