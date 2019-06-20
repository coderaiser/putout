'use strict';

const {
    isArrowFunctionExpression,
    isFunctionExpression,
    isFunctionDeclaration,
    isObjectMethod,
    isClassMethod,
    isCatchClause,
    isIfStatement,
    isTryStatement,
} = require('putout').types;

module.exports.report = () => 'Empty block statement';

module.exports.fix = (path) => {
    path.remove();
};

module.exports.traverse = ({push}) => {
    return {
        BlockStatement(path) {
            const {
                node,
                parentPath,
            } = path;
            
            const {body} = node;
            
            if (body.length)
                return;
            
            const parentNode = parentPath.node;
            
            if (isFunction(parentNode))
                return;
            
            if (isCatchClause(parentNode))
                return;
            
            if (isTryStatement(parentNode))
                return push(parentPath);
            
            if (blockIsConsequent(node, parentNode))
                return push(parentPath);
            
            if (blockIsBody(node, parentNode))
                return push(parentPath);
            
            if (blockIsIndependentBody(node, parentNode))
                return push(path);
        },
    };
};

function isFunction(node) {
    return isArrowFunctionExpression(node)
    || isFunctionExpression(node)
    || isFunctionDeclaration(node)
    || isObjectMethod(node)
    || isClassMethod(node);
}

function blockIsBody(node, parentNode) {
    const {body} = parentNode;
    
    if (!body)
        return false;
    
    return body === node;
}

function blockIsIndependentBody(node, parentNode) {
    const {body} = parentNode;
    
    if (!body)
        return false;
    
    return body[0] === node;
}

function blockIsConsequent(node, parentNode) {
    if (!isIfStatement(parentNode))
        return;
    
    return parentNode.consequent === node;
}

