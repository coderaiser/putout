'use strict';

const {
    isMemberExpression,
    isIdentifier,
} = require('putout').types;

module.exports.fix = require('./fix');

module.exports.report = () => 'Object destructuring should be used';

module.exports.find = (ast, {traverse}) => {
    const places = [];
    
    traverse(ast, {
        VariableDeclarator(path) {
            const {node} = path;
            const {
                id,
                init,
            } = node;
            
            if (isSameName(id, init))
                places.push(path);
        },
    });
    
    return places;
};

function isSameName(id, init) {
    if (!isMemberExpression(init))
        return false;
    
    if (!isIdentifier(id))
        return false;
    
    const {name} = id;
    
    if (!isIdentifier(init.property, {name}))
        return false;
    
    return true;
}

