export const report = () => `Avoid 'return undefined'`;

export const match = () => ({
    return: (vars, {parentPath}) => {
        if (!parentPath.isBlockStatement())
            return false;
        
        return parentPath.parentPath.isFunction();
    },
});

export const replace = () => ({
    'return': '',
    'return undefined': 'return',
    'return void 0': 'return',
});
