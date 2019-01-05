'use strict';

const traverse = require('@babel/traverse').default;

const {
    isIdentifier,
    isMemberExpression,
    isStringLiteral,
} = require('@babel/types');

module.exports = (ast) => {
    const places = [];
    
    traverse(ast, {
        CallExpression(path) {
            const {node} = path;
            const {callee} = node;
            
            if (!isMemberExpression(callee))
                return;
            
            const {
                property,
                object,
            } = callee;
            
            if (!isIdentifier(object))
                return;
            
            traverseProperty(property, () => {
                node.callee = callee.object;
                places.push(node);
            });
        }
    });
    
    return places;
};

function traverseProperty(node, fn) {
    if (isIdentifierName(node, 'only'))
        return fn();
    
    if (isStringLiteralValue(node, 'only')) {
        return fn();
    }
}

function isIdentifierName(node, name) {
    return isIdentifier(node) && node.name === name;
}

function isStringLiteralValue(node, name) {
    return isStringLiteral(node) && node.value === name;
}

module.exports.message = '"test.only" should not be used';

