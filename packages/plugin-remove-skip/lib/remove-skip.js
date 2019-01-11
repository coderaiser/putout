'use strict';

const traverse = require('@babel/traverse').default;

const {
    isIdentifier,
    isMemberExpression,
    isStringLiteral,
} = require('@babel/types');

module.exports.getMessage = () => '"test.skip" should not be used';

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
            
            traverseProperty('skip', path, property, push);
        }
    });
    
    return places;
};

function traverseProperty(name, path, node, fn) {
    if (isIdentifier(node, {name}))
        return fn(path);
    
    if (isStringLiteral(node, {value: name}))
        return fn(path);
}

