'use strict';

module.exports.report = () => 'Unused expression statement';

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        ExpressionStatement(chunk) {
            const expressionPath = chunk.expression;
            
            if (expressionPath.isIdentifier()) {
                push(expressionPath);
            }
        },
    });
};

module.exports.fix = (chunk) => {
    chunk.remove();
};

