'use strict';

module.exports.report = () => 'Unused expression statement';

module.exports.find = (ast, {push, traverse}) => {
    const strictModeNodes = [];
    
    traverse(ast, {
        ExpressionStatement(path) {
            const expressionPath = path.get('expression');
            
            if (expressionPath.isIdentifier())
                return push(expressionPath);
            
            if (expressionPath.isObjectExpression())
                return push(expressionPath);
            
            if (expressionPath.isArrayExpression())
                return push(expressionPath);
            
            if (!expressionPath.isLiteral())
                return;
            
            const {node} = expressionPath;
            
            if (node.value === 'use strict') {
                strictModeNodes.push(expressionPath);
                return;
            }
            
            push(expressionPath);
        },
    });
    
    if (strictModeNodes.length === 1)
        return;
    
    return strictModeNodes.slice(1);
};

module.exports.fix = (path) => {
    path.remove();
};

