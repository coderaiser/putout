'use strict';

module.exports.report = () => `Use 'params' instead of 'expression'`;

module.exports.include = () => ['Function'];

module.exports.fix = (path) => {
    const params = [];
    
    path
        .get('params.0')
        .traverse({
            Identifier(path) {
                params.push(path.node);
            },
        });
    
    path.node.params = params;
};
module.exports.filter = (path) => {
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
