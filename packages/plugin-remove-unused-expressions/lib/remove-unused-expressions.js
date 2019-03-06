'use strict';

module.exports.report = () => 'Unused expression statement';

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        ExpressionStatement(path) {
            const expressionPath = path.get('expression');
            if (expressionPath.isIdentifier()) {
                push(expressionPath);
            }
        },
    });
};

module.exports.fix = (path) => {
    path.remove();
};

