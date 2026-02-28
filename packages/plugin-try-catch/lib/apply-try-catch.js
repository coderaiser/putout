import {types, operator} from 'putout';

const {
    awaitExpression,
    arrayPattern,
    variableDeclarator,
    variableDeclaration,
    ifStatement,
    identifier,
    callExpression,
} = types;

const {replaceWithMultiple} = operator;

export const applyTryCatch = (tryName) => (path) => {
    const expression = parseExpression(path);
    const args = expression.arguments;
    
    const callNode = callExpression(identifier(tryName), [
        expression.callee,
        ...args,
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
    
    delete param.typeAnnotation;
    
    const ifNode = body.body.length ? [
        ifStatement(param, body),
    ] : body.body;
    
    const varNode = variableDeclaration('const', [
        variableDeclarator(arrayPattern([param]), maybeAwait(path, callNode)),
    ]);
    
    const bodyOfTry = path.get('block').node.body.slice(1);
    
    replaceWithMultiple(path, [
        varNode,
        ...ifNode,
        ...bodyOfTry,
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
        return awaitExpression(node);
    
    return node;
}
