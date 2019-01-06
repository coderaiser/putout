'use strict';

const traverse = require('@babel/traverse').default;

const {
    isIdentifier,
    isMemberExpression,
    isStringLiteral,
} = require('@babel/types');

module.exports.message = '"test.only" should not be used';

module.exports.fix = (path) => {
    const {node} = path;
    node.callee = node.callee.object;
};

module.exports.find = (ast) => {
    const places = [];
    const push = places.push.bind(places);
    
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
            
            traverseProperty(path, property, push);
        }
    });
    
    return places;
};

function traverseProperty(path, node, fn) {
    if (isIdentifierName(node, 'only'))
        return fn(path);
    
    if (isStringLiteralValue(node, 'only')) {
        return fn(path);
    }
}

function isIdentifierName(node, name) {
    return isIdentifier(node) && node.name === name;
}

function isStringLiteralValue(node, name) {
    return isStringLiteral(node) && node.value === name;
}

