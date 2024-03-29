'use strict';

const {types} = require('putout');
const {
    isCallExpression,
    isReturnStatement,
} = types;

module.exports.report = () => `Avoid useless spread '...'`;

module.exports.filter = (path) => {
    const [first] = path.node.properties;
    
    const {
        comments,
        trailingComments,
    } = first;
    
    if (comments?.length)
        return false;
    
    if (trailingComments?.length)
        return false;
    
    if (isCallExpression(first.argument))
        return true;
    
    return isReturnStatement(path.parentPath);
};

module.exports.exclude = () => [
    '({...__b && {__c: __d}})',
    '__a = {...__a}',
];

module.exports.replace = () => ({
    '({...__a})': '__a',
});
