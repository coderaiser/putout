'use strict';

const {types} = require('putout');
const {
    SequenceExpression,
    LogicalExpression,
    isBlockStatement,
    isExpression,
} = types;

const getExpression = (a) => a.expression;

module.exports.report = () => `Use 'logical expressions' instead of 'if conditions'`;

module.exports.match = () => ({
    'if(__a) __b': ({__b}) => {
        if (isExpression(__b))
            return true;
        
        if (!isBlockStatement(__b))
            return false;
        
        const expressions = __b
            .body
            .map(getExpression)
            .filter(Boolean);
        
        return expressions.length === __b.body.length;
    },
});

module.exports.replace = () => ({
    'if (__a) __b': ({__a, __b}) => {
        if (!isBlockStatement(__b))
            return '__a && __b';
        
        if (!__b.body.length)
            return '__a';
        
        if (__b.body.length === 1)
            return LogicalExpression('&&', __a, __b.body[0].expression);
        
        const expressions = __b
            .body
            .map(getExpression)
            .filter(Boolean);
        
        return LogicalExpression('&&', __a, SequenceExpression(expressions));
    },
});
