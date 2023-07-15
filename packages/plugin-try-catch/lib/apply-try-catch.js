'use strict';

const {types, operator} = require('putout');
const {replaceWithMultiple} = operator;

const {
    AwaitExpression,
    ArrayPattern,
    VariableDeclaration,
    VariableDeclarator,
    CallExpression,
    Identifier,
    IfStatement,
} = types;

module.exports = (tryName) => (path) => {
    const expression = parseExpression(path);
    
    const callNode = CallExpression(Identifier(tryName), [
        expression.callee,
        ...expression.arguments,
    ]);
    
    const {param} = path.node.handler;
    const {body} = path.get('handler').node;
    
    if (!param) {
        replaceWithMultiple(path, [
            maybeAwait(path, callNode),
            ...body.body,
        ]);
        return;
    }
    
    const ifNode = body.body.length ? [
        IfStatement(param, body),
    ] : body.body;
    
    const varNode = VariableDeclaration('const', [
        VariableDeclarator(ArrayPattern([param]), maybeAwait(path, callNode)),
    ]);
    
    replaceWithMultiple(path, [
        varNode,
        ...ifNode,
    ]);
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
