'use strict';

const {operator} = require('putout');
const {remove} = operator;

module.exports.report = () => 'Unused expression statement';

module.exports.fix = (path) => {
    remove(path);
};

module.exports.traverse = ({push}) => ({
    ExpressionStatement(path) {
        const expressionPath = path.get('expression');
        
        if (expressionPath.isIdentifier())
            return push(expressionPath);
        
        if (expressionPath.isObjectExpression())
            return push(expressionPath);
        
        if (expressionPath.isArrayExpression())
            return push(expressionPath);
        
        if (expressionPath.isMemberExpression())
            return push(expressionPath);
        
        if (isNotDirectiveLiteral(expressionPath))
            return push(expressionPath);
        
        if (expressionPath.isUnaryExpression({operator: '!'}))
            return push(expressionPath);
    },
});

function isNotDirectiveLiteral(path) {
    if (!path.isLiteral())
        return false;
    
    if (!path.isStringLiteral({value: 'use strict'}))
        return true;
    
    const {parentPath} = path;
    const isDirective = parentPath === parentPath.parentPath.get('body.0');
    
    return !isDirective;
}

