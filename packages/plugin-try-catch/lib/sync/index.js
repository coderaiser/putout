'use strict';

const {types} = require('putout');
const applyTryCatch = require('../apply-try-catch');
const {isCallExpression} = types;

module.exports.report = () => 'Use tryCatch instead of try-catch block';

module.exports.fix = applyTryCatch('tryCatch');

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
    
    return isCallExpression(first.expression);
};
