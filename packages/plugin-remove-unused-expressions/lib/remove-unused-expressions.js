'use strict';

module.exports.report = () => 'Unused expression statement';

module.exports.fix = (path) => {
    path.remove();
};

module.exports.traverse = ({push, options}) => {
    const {dismiss = []} = options;
    
    return {
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
            
            if (dismiss.includes(node.value))
                return;
            
            push(expressionPath);
        },
    };
};

