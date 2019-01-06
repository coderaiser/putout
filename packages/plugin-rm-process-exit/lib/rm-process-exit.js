'use strict';

const traverse = require('@babel/traverse').default;

const {
    isIdentifier,
    isMemberExpression,
    isStringLiteral,
} = require('@babel/types');

module.exports.message = '"process.exit" should not be used';

module.exports.fix = (path) => {
    path.remove();
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
            
            if (!isIdentifierName(object, 'process'))
                return;
            
            traverseProperty('exit', path, property, push);
        }
    });
    
    return places;
};

function traverseProperty(name, path, node, fn) {
    if (isIdentifierName(node, name))
        return fn(path);
    
    if (isStringLiteralValue(node, name))
        return fn(path);
}

function isIdentifierName(node, name) {
    return isIdentifier(node) && node.name === name;
}

function isStringLiteralValue(node, name) {
    return isStringLiteral(node) && node.value === name;
}

