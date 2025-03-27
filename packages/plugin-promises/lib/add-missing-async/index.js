export const report = () => `Add missing 'async'`;

export const fix = (path) => {
    path.node.async = true;
};

export const traverse = ({push}) => ({
    AwaitExpression(path) {
        const fnPath = path.getFunctionParent();
        
        if (!fnPath)
            return;
        
        if (fnPath.node.async)
            return;
        
        push(fnPath);
    },
});
