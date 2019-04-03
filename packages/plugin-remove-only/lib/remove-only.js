'use strict';

const {
    isIdentifier,
    isMemberExpression,
    isStringLiteral,
} = require('putout').types;

module.exports.report = () => '"test.only" should not be used';

module.exports.fix = (chunk) => {
    chunk.callee = chunk.callee.object;
};

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        CallExpression(chunk) {
            const {callee} = chunk;
            
            if (!isMemberExpression(callee))
                return;
            
            const {
                property,
                object,
            } = callee;
            
            if (!isIdentifier(object))
                return;
            
            traverseProperty('only', chunk, property, push);
        },
    });
};

function traverseProperty(name, chunk, node, fn) {
    if (isIdentifier(node, {name}))
        return fn(chunk);
    
    if (isStringLiteral(node, {value: name}))
        return fn(chunk);
}

