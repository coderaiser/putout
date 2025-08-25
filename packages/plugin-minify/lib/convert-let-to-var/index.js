import {types} from 'putout';

const {
    isIfStatement,
    isLabeledStatement,
} = types;

export const report = () => `Use 'var' instead of 'let' inside label`;

export const match = () => ({
    'let __b = __c': (vars, path) => {
        if (isLabeledStatement(path.parentPath))
            return true;
        
        return isIfStatement(path.parentPath);
    },
});

export const replace = () => ({
    'let __b = __c': 'var __b = __c',
});
