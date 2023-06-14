'use strict';

const {types} = require('putout');
const {isCallExpression} = types;

module.exports.report = () => `Avoid useless spread '...'`;

module.exports.filter = (path) => {
    const [first] = path.node.properties;
    const {
        comments,
        trailingComments,
    } = first;
    
    if (!isCallExpression(first.argument))
        return false;
    
    if (comments?.length)
        return false;
    
    return !trailingComments?.length;
};

module.exports.exclude = () => [
    '({...__b && {__c: __d}})',
    '__a = {...__a}',
];

module.exports.replace = () => ({
    '({...__a})': '__a',
});
