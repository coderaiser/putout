export const report = () => `Add missing 'async'`;

export const fix = (path) => {
    path.node.async = true;
};

export const traverse = ({push}) => ({
    'await using __ = __': check(push),
    'AwaitExpression': check(push),
});

export const check = (push) => (path) => {
    const fnPath = path.getFunctionParent();
    
    if (!fnPath)
        return;
    
    if (fnPath.node.async)
        return;
    
    if (fnPath.__putout_promises_add_missing_async)
        return;
    
    fnPath.__putout_promises_add_missing_async = true;
    
    push(fnPath);
};
