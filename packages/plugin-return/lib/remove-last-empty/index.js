import {types} from 'putout';

const {
    isFunction,
    isBlockStatement,
} = types;

export const report = () => `Avoid empty 'return' in function body`;

export const match = () => ({
    return: (vars, path) => {
        const {parentPath} = path;
        
        if (!isBlockStatement(parentPath))
            return false;
        
        const next = path.getNextSibling();
        
        if (next.node)
            return false;
        
        return isFunction(parentPath.parentPath);
    },
});

export const replace = () => ({
    return: '',
});
