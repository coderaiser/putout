'use strict';

module.exports.report = () => 'Unused expression statement';

module.exports.fix = (path) => {
    path.remove();
};

module.exports.traverse = ({push, listStore}) => {
    return {
        Program: {
            exit() {
                listStore()
                    .slice(1)
                    .map(push);
            },
        },
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
                listStore(expressionPath);
                return;
            }
            
            push(expressionPath);
        },
    };
};

