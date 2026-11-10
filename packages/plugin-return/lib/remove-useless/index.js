import {types, operator} from 'putout';

const {
    replaceWith,
    createTypeChecker,
} = operator;

const {
    isIdentifier,
    isLiteral,
    isAssignmentPattern,
    isObjectExpression,
} = types;

const isCandidate = createTypeChecker([
    ['-: params.0.typeAnnotation -> +'],
    ['-: body -> !BlockStatement'],
    ['-: body.body.0 -> !ReturnStatement'],
    ['-: body.body.0.leadingComments.length', '>', 0],
    ['-: body.body.0.argument -> NewExpression'],
    ['-: body.body.0.argument -> AwaitExpression'],
    ['-: body.body.0.argument -> TemplateLiteral'],
    ['-: body.body.0.argument -> LogicalExpression'],
    ['+: body.body.0.argument -> +'],
]);

export const report = () => `Avoid useless 'return'`;

export const include = () => [
    'ArrowFunctionExpression',
];

export const fix = (path) => {
    const bodyPath = path.get('body');
    const returnPath = bodyPath.get('body.0');
    
    replaceWith(bodyPath, returnPath.node.argument);
};

export const filter = (path) => {
    if (!isCandidate(path.node))
        return false;
    
    const argPath = path.get('body.body.0.argument');
    
    if (hasComplexParams(path) && !isObjectExpression(argPath))
        return false;
    
    if (isChainCall(argPath))
        return false;
    
    return isSimpleArgs(argPath);
};

const isChainCall = (path) => {
    if (!path.isCallExpression())
        return false;
    
    const calleePath = path.get('callee');
    
    if (calleePath.isMemberExpression())
        return true;
    
    const objectPath = calleePath.get('object');
    
    return objectPath.isCallExpression();
};

const isSimpleArgs = (path) => {
    if (!path.isCallExpression())
        return true;
    
    for (const arg of path.node.arguments) {
        if (isIdentifier(arg))
            continue;
        
        if (isLiteral(arg))
            continue;
        
        return false;
    }
    
    return true;
};

function hasComplexParams(path) {
    for (const param of path.get('params')) {
        if (isAssignmentPattern(param))
            return true;
    }
    
    return false;
}
