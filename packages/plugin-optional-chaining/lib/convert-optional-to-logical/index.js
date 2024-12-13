'use strict';

const {template, operator} = require('putout');
const {getLogical} = require('../get-logical');

module.exports.report = () => `Use Logical Expression instead of Optional Chaining`;

const {replaceWith} = operator;

module.exports.fix = (path) => {
    const logical = getLogical(path);
    replaceWith(path, template.ast(logical));
};

module.exports.include = () => [
    'OptionalMemberExpression',
    'OptionalCallExpression',
];

module.exports.filter = ({parentPath}) => {
    if (parentPath.isOptionalMemberExpression())
        return false;
    
    if (parentPath.isAssignmentExpression())
        return false;
    
    return !parentPath.isOptionalCallExpression();
};
