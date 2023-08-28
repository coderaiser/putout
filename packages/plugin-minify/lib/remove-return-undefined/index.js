export const report = () => `Avoid 'return undefined'`;

export const match = () => ({
    return: check,
});

export const replace = () => ({
    'return': '',
    'return undefined': 'return',
    'return void 0': 'return',
});

function check(vars, {parentPath}) {
    if (!parentPath.isBlockStatement())
        return false;
    
    return parentPath.parentPath.isFunction();
}
