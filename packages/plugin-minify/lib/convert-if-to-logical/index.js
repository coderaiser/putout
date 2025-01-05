import {types} from 'putout';

const {
    SequenceExpression,
    LogicalExpression,
    isBlockStatement,
    isExpression,
    isYieldExpression,
    ConditionalExpression,
    UnaryExpression,
    isConditionalExpression,
    isLogicalExpression,
} = types;

const parseExpressions = ({body}) => body
    .map(getExpression)
    .filter(Boolean);

const getExpression = ({expression}) => {
    if (!expression)
        return null;
    
    if (isYieldExpression(expression))
        return null;
    
    return expression;
};

export const report = () => `Use 'logical expressions' instead of 'if conditions'`;

export const match = () => ({
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

export const replace = () => ({
    'if (__a) __b': ({__a, __b}) => {
        if (isConditionalExpression(__b))
            return '__a && (__b)';
        
        if (!isBlockStatement(__b)) {
            maybeAddParens(__a);
            return '__a && __b';
        }
        
        if (!__b.body.length)
            return '__a';
        
        if (__b.body.length === 1) {
            const {expression} = __b.body[0];
            
            maybeAddParens(__a);
            
            return LogicalExpression('&&', __a, expression);
        }
        
        const expressions = parseExpressions(__b);
        
        return LogicalExpression('&&', maybeAddParens(__a), SequenceExpression(expressions));
    },
    'if (__a) __b; else __c': ({__a, __b, __c}) => {
        if (!__b.body.length && isBlockStatement(__c))
            return LogicalExpression('&&', UnaryExpression('!', __a), __c.body[0].expression);
        
        if (__b.body.length === 1 && __c.body.length === 1)
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

function maybeAddParens(node) {
    if (!isLogicalExpression(node))
        return node;
    
    node.extra = {
        parenthesized: true,
    };
    
    return node;
}
