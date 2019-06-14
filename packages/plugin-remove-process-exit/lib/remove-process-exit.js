'use strict';

const {
    isIdentifier,
    isMemberExpression,
    isStringLiteral,
} = require('putout').types;

module.exports.report = () => '"process.exit" should not be used';

module.exports.fix = (path) => {
    path.remove();
};

module.exports.find = (ast, {push, traverse}) => {
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
};

function traverseProperty(name, path, node, fn) {
    if (isIdentifier(node, {name}))
        return fn(path);
    
    if (isStringLiteral(node, {value: name}))
        return fn(path);
}

