'use strict';

const {replaceWith} = require('putout').operator;

module.exports.report = (path) => `Avoid useless non null expression: '${path.parentPath}' -> '${path}'`;

module.exports.fix = (path) => {
    replaceWith(path, path.node.expression);
};

module.exports.traverse = ({push}) => ({
    TSNonNullExpression(path) {
        const expressionPath = path.get('expression');
        
        if (expressionPath.isTSNonNullExpression())
            push(expressionPath);
        
        if (path.parentPath.isOptionalMemberExpression())
            push(path);
    },
});
