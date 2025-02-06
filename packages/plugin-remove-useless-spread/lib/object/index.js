'use strict';

const {types} = require('putout');
const {
    isCallExpression,
    isReturnStatement,
    isSpreadElement,
} = types;

module.exports.report = () => `Avoid useless spread '...'`;

module.exports.filter = (path) => {
    const {node, parentPath} = path;
    const [first] = node.properties;
    
    const {trailingComments} = first;
    
    if (trailingComments?.length)
        return false;
    
    if (isCallExpression(parentPath) && isSpreadElement(first))
        return true;
    
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
