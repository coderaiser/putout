'use strict';

const {
    isArrowFunctionExpression,
    isFunctionExpression,
    isFunctionDeclaration,
    isObjectMethod,
    isClassMethod,
    isIfStatement,
} = require('putout').types;

module.exports.report = () => 'Empty block statement';

module.exports.fix = (chunk) => {
    chunk.remove();
};

module.exports.find = (ast, {traverse}) => {
    const places = [];
    
    traverse(ast, {
        BlockStatement(chunk) {
            const {
                node,
                parentPath,
            } = chunk;
            
            const {body} = node;
            
            if (body.length)
                return;
            
            const parentNode = parentPath.node;
            
            if (isFunction(parentNode))
                return;
            
            if (blockIsBody(node, parentNode)) {
                places.push(parentPath);
                return;
            }
            
            if (blockIsConsequent(node, parentNode)) {
                places.push(parentPath);
                return;
            }
            
            places.push(chunk);
        },
    });
    
    return places;
};

function isFunction(node) {
    return isArrowFunctionExpression(node)
    || isFunctionExpression(node)
    || isFunctionDeclaration(node)
    || isObjectMethod(node)
    || isClassMethod(node);
}

function blockIsBody(node, parentNode) {
    return parentNode.body === node;
}

function blockIsConsequent(node, parentNode) {
    if (!isIfStatement(parentNode))
        return;
    
    return parentNode.body === node.consequent;
}

