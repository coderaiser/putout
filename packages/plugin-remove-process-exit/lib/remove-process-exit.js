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
            
            const name = 'process';
            if (!isIdentifier(object, {name}))
                return;
            
            traverseProperty('exit', path, property, push);
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

