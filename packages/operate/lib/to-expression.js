'use strict';

const {types} = require('@putout/babel');
const {
    isExpression,
    ExpressionStatement,
    toStatement,
} = types;

module.exports.toExpression = (el) => {
    const {type} = el;
    
    const ignore = [
        'ObjectProperty',
    ];
    
    if (ignore.includes(type))
        return el;
    
    if (isExpression(el))
        return ExpressionStatement(el);
    
    return toStatement(el);
};
