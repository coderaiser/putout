'use strict';

const {
    isIdentifier,
    isMemberExpression,
    isStringLiteral,
} = require('putout').types;

module.exports.report = () => '"test.only" should not be used';

module.exports.fix = ({node}) => {
    node.callee = node.callee.object;
};

module.exports.find = (ast, {traverse}) => {
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
            
            traverseProperty('only', path, property, push);
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

