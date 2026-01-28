export const report = () => `Use arguments instead of expression`;

export const include = () => ['Function'];

export const fix = (path) => {
    const params = [];
    
    path.get('params.0').traverse({
        Identifier(path) {
            params.push(path.node);
        },
    });
    
    path.node.params = params;
};
export const filter = (path) => {
    const params = path.get('params');
    
    if (!params.length)
        return false;
    
    const [first] = params;
    
    if (first.isBinaryExpression())
        return true;
    
    if (first.isLogicalExpression())
        return true;
    
    return first.isCallExpression();
};
