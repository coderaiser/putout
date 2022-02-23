'use strict';

const {
    types,
    operator,
} = require('putout');

const {replaceWithMultiple} = operator;

const {
    AwaitExpression,
    ArrayPattern,
    VariableDeclaration,
    VariableDeclarator,
    CallExpression,
    Identifier,
} = types;

module.exports = ({camel}) => (path) => {
    const expression = parseExpression(path);
    
    const callNode = CallExpression(Identifier(camel), [
        expression.callee,
        ...expression.arguments,
    ]);
    
    const {param} = path.node.handler;
    const varNode = VariableDeclaration('const', [
        VariableDeclarator(ArrayPattern([param]), maybeAwait(path, callNode)),
    ]);
    
    replaceWithMultiple(path, [varNode, ...path.get('handler.body').node.body]);
    //replaceWith(path, varNode);
};

function parseExpression(path) {
    const expressionPath = path.get('block.body.0.expression');
    
    if (expressionPath.isAwaitExpression())
        return expressionPath.node.argument;
    
    return expressionPath.node;
}

function maybeAwait(path, node) {
    const expressionPath = path.get('block.body.0.expression');
    
    if (expressionPath.isAwaitExpression())
        return AwaitExpression(node);
    
    return node;
}

