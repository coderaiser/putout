import {
    isChar,
    isCharacterClass,
    isGroup,
    characterClass,
} from '../types.js';

export const report = ({from, to}) => `Use character class instead of single character alternation: '${from}' -> '${to}'`;

export const fix = ({path, left, right}) => {
    if (isCharacterClass(left)) {
        right.escaped = false;
        
        return path.replace(characterClass([
            ...left.expressions,
            right,
        ]));
    }
    
    left.escaped = false;
    right.escaped = false;
    
    const node = characterClass([left, right]);
    
    if (isGroup(path.parentPath)) {
        path.parentPath.replace(node);
        return;
    }
    
    path.replace(node);
    return;
};

export const traverse = ({push}) => ({
    Disjunction(path) {
        const {left, right} = path.node;
        
        if (!isChar(right) || right.value.length !== 1)
            return;
        
        if (isCharacterClass(left))
            push({
                path,
                left,
                right,
            });
        
        if (!isChar(left) || left.value.length !== 1)
            return;
        
        push({
            path,
            left,
            right,
        });
    },
});
