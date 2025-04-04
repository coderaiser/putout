import {types} from 'putout';

const {
    isBlockStatement,
    isExpression,
    isYieldExpression,
    isConditionalExpression,
    isLogicalExpression,
    logicalExpression,
    sequenceExpression,
    unaryExpression,
    conditionalExpression,
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
            
            return logicalExpression('&&', __a, expression);
        }
        
        const expressions = parseExpressions(__b);
        
        return logicalExpression('&&', maybeAddParens(__a), sequenceExpression(expressions));
    },
    'if (__a) __b; else __c': ({__a, __b, __c}) => {
        if (!__b.body.length && isBlockStatement(__c))
            return logicalExpression('&&', unaryExpression('!', __a), __c.body[0].expression);
        
        if (__b.body.length === 1 && __c.body.length === 1)
            return conditionalExpression(__a, __b.body[0].expression, __c.body[0].expression);
        
        const expressionsB = parseExpressions(__b);
        const expressionsC = parseExpressions(__c);
        
        return conditionalExpression(
            __a,
            sequenceExpression(expressionsB),
            sequenceExpression(expressionsC),
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
