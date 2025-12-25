import {
    isCharacterClass,
    isAlternative,
} from '../types.js';

export const report = () => 'Avoid useless escape';

export const traverse = ({push}) => ({
    Char(path) {
        const {parentPath} = path;
        const {escaped, symbol} = path.node;
        
        if (!escaped)
            return false;
        
        if (isCharacterClass(parentPath)) {
            if (/[()]/.test(symbol)) {
                push(path);
                return;
            }
            
            if (symbol === '^' && path.index) {
                push(path);
                return;
            }
            
            return;
        }
        
        if (isAlternative(parentPath)) {
            if (!/[:,]/.test(symbol))
                return;
            
            push(path);
            return;
        }
        
        if (symbol === '`')
            push(path);
    },
});

export const fix = (path) => {
    path.node.escaped = false;
};
