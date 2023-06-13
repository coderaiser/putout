'use strict';

const {types} = require('putout');
const {
    SequenceExpression,
    LogicalExpression,
    isBlockStatement,
    isExpression,
    ConditionalExpression,
    UnaryExpression,
} = types;

const parseExpressions = ({body}) => body.map(getExpression).filter(Boolean);

const getExpression = (a) => a.expression;

module.exports.report = () => `Use 'logical expressions' instead of 'if conditions'`;

module.exports.match = () => ({
    'if (__a) __b; else __c': ({__b, __c}) => {
        if (!isBlockStatement(__b))
            return false;
        
        if (!isBlockStatement(__c))
            return false;
        
        const expressionsB = parseExpressions(__b);
        const expressionsC = parseExpressions(__c);
        
        if (expressionsB.length !== __b.body.length)
            return false;
        
        return expressionsC.length === __c.body.length;
    },
    'if (__a) __b': ({__b}) => {
        if (isExpression(__b))
            return true;
        
        if (!isBlockStatement(__b))
            return false;
        
        const expressions = parseExpressions(__b);
        
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
        
        const expressions = parseExpressions(__b);
        
        return LogicalExpression('&&', __a, SequenceExpression(expressions));
    },
    'if (__a) __b; else __c': ({__a, __b, __c}) => {
        if (!__b.body.length && isBlockStatement(__c))
            return LogicalExpression('&&', UnaryExpression('!', __a), __c.body[0].expression);
        
        if (__b.body.length === 1)
            return ConditionalExpression(__a, __b.body[0].expression, __c.body[0].expression);
        
        const expressionsB = parseExpressions(__b);
        const expressionsC = parseExpressions(__c);
        
        return ConditionalExpression(
            __a,
            SequenceExpression(expressionsB),
            SequenceExpression(expressionsC),
        );
    },
});
