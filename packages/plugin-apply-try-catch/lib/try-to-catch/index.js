'use strict';

const {types} = require('putout');

const {isAwaitExpression} = types;

const applyTryCatch = require('../apply-try-catch');

module.exports.report = () => 'Use await tryToCatch instead of try-to-catch block';

module.exports.fix = applyTryCatch('tryToCatch');

module.exports.include = () => [
    'TryStatement',
];

module.exports.filter = ({node}) => {
    const {
        block,
        handler,
    } = node;
    const {length} = block.body;
    const [first] = block.body;
    
    if (length !== 1)
        return false;
    
    if (!handler.param)
        return false;
    
    return isAwaitExpression(first.expression);
};

