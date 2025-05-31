'use strict';

const {types} = require('@putout/babel');
const {
    isExpression,
    toStatement,
    expressionStatement,
} = types;

module.exports.toExpression = (el) => {
    const {type} = el;
    
    const ignore = [
        'ObjectProperty',
    ];
    
    if (ignore.includes(type))
        return el;
    
    if (isExpression(el))
        return expressionStatement(el);
    
    return toStatement(el);
};
