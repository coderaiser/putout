'use strict';

const {types} = require('putout');
const {isCallExpression} = types;

module.exports.report = () => `Avoid useless spread '...'`;

module.exports.filter = (path) => {
    const [first] = path.node.properties;
    const {comments} = first;
    
    if (!isCallExpression(first.argument))
        return false;
    
    return !comments?.length;
};

module.exports.exclude = () => [
    '({...__b && {__c: __d}})',
    '__a = {...__a}',
];

module.exports.replace = () => ({
    '({...__a})': '__a',
});
