'use strict';

const {types} = require('putout');

const applyTryCatch = require('../apply-try-catch');

const {isAwaitExpression} = types;

module.exports.report = () => `Use 'await tryToCatch()' instead of 'await' in 'try-catch' block`;

module.exports.fix = applyTryCatch('tryToCatch');

module.exports.include = () => [
    'TryStatement',
];

module.exports.filter = (path) => {
    const {node} = path;
    
    const {block, finalizer} = node;
    
    const {length} = block.body;
    const [first] = block.body;
    
    if (path.parentPath.scope.bindings.error)
        return false;
    
    if (finalizer)
        return false;
    
    if (length !== 1)
        return false;
    
    return isAwaitExpression(first.expression);
};
