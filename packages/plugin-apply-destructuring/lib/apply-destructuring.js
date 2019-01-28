'use strict';

const {
    isMemberExpression,
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
    
    return id.name === init.property.name;
}

