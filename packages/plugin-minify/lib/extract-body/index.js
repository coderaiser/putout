'use strict';

const {types, operator} = require('putout');

const {
    isExpressionStatement,
    isReturnStatement,
    isArrowFunctionExpression,
} = types;

const {replaceWith} = operator;
const isArrow = isArrowFunctionExpression;

module.exports.report = () => `Avoid blocks with one statement`;

module.exports.fix = (path) => {
    const {parentPath} = path;
    const [first] = path.node.body;
    
    if (parentPath.isArrowFunctionExpression())
        return replaceWith(path, parseExpression(first));
    
    replaceWith(path, first);
};

module.exports.include = () => [
    'BlockStatement',
];

module.exports.filter = ({node, parentPath}) => {
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
