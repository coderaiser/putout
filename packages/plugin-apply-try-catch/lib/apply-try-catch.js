'use strict';

const {
    types,
    template,
    operator,
} = require('putout');

const {replaceWith} = operator;

const {
    AwaitExpression,
    ArrayPattern,
    VariableDeclaration,
    VariableDeclarator,
    CallExpression,
    Identifier,
} = types;

module.exports = ({kebab, camel}) => (path) => {
    const expression = parseExpression(path);
    
    if (!path.scope.getAllBindings()[camel]) {
        const importNode = template.ast(`import ${camel} from "${kebab}"`);
        const programPath = path.scope.getProgramParent().path;
        const {body} = programPath.node;
        
        body.unshift(importNode);
    }
    
    const callNode = CallExpression(Identifier(camel), [
        expression.callee,
        ...expression.arguments,
    ]);
    
    const {param} = path.node.handler;
    const varNode = VariableDeclaration('const', [
        VariableDeclarator(ArrayPattern([param]), maybeAwait(path, callNode)),
    ]);
    
    replaceWith(path, varNode);
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

