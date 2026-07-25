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

const {
    compare,
    getBindingPath,
    replaceWithMultiple,
    remove,
} = operator;

export const applyTryCatch = (tryName) => (path) => {
    const expression = parseExpression(path);
    const args = expression.arguments;
    
    const callNode = callExpression(identifier(tryName), [
        expression.callee,
        ...args,
    ]);
    
    const {handler} = path.node;
    const {param, body} = handler;
    
    if (!param) {
        replaceWithMultiple(path, [
            maybeAwait(path, callNode),
            ...body.body,
        ]);
        return;
    }
    
    delete param.typeAnnotation;
    
    const [newParam, ifNode] = parseIfNode(path);
    
    const varNode = variableDeclaration('const', [
        variableDeclarator(arrayPattern([newParam]), maybeAwait(path, callNode)),
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

function parseIfNode(path) {
    const {handler} = path.node;
    const {param, body} = handler;
    
    const emptyBody = [];
    const {length} = body.body;
    
    if (!length)
        return [param, emptyBody];
    
    const [first] = body.body;
    
    if (length === 1 && compare(first, 'error = e')) {
        const errorBinding = getBindingPath(path, 'error');
        remove(errorBinding);
        
        return [
            identifier('error'),
            emptyBody,
        ];
    }
    
    return [
        param,
        [
            ifStatement(param, body),
        ],
    ];
}
