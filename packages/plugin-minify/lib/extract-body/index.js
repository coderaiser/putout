import {
    types,
    operator,
} from 'putout';

const {
    isExpressionStatement,
    isReturnStatement,
    isArrowFunctionExpression,
} = types;

const {replaceWith} = operator;
const isArrow = isArrowFunctionExpression;

export const report = () => `Avoid blocks with one statement`;

export const fix = (path) => {
    const {parentPath} = path;
    const [first] = path.node.body;
    
    if (parentPath.isArrowFunctionExpression())
        return replaceWith(path, parseExpression(first));
    
    replaceWith(path, first);
};

export const include = () => [
    'BlockStatement',
];

export const filter = ({node, parentPath}) => {
    const {body} = node;
    
    if (body.length !== 1)
        return false;
    
    if (parentPath.isFunction() && !parentPath.isArrowFunctionExpression())
        return false;
    
    if (parentPath.isTryStatement())
        return false;
    
    if (parentPath.isCatchClause())
        return false;
    
    const [first] = body;
    
    return !isArrow(parentPath) || expressionOrReturn(first);
};

const expressionOrReturn = (node) => {
    if (isExpressionStatement(node))
        return true;
    
    return isReturnStatement(node);
};

function parseExpression(node) {
    if (isReturnStatement(node))
        return node.argument;
    
    return node.expression;
}
