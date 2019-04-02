'use strict';

const {
    isObjectPattern,
    isArrayPattern,
} = require('putout').types;

module.exports.report = (path) => {
    const {id} = path.node;
    
    if (isObjectPattern(id))
        return 'Empty object pattern';
    
    if (isArrayPattern(id))
        return 'Empty array pattern';
};

module.exports.fix = (path) => {
    path.remove();
};

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        ObjectPattern(path) {
            const {node, parentPath} = path;
            const {properties} = node;
            
            if (properties.length)
                return;
            
            if (parentPath.isVariableDeclarator()) {
                push(parentPath);
                return;
            }
            
            push(path);
        },
        ArrayPattern(path) {
            const {node, parentPath} = path;
            const {elements} = node;
            
            if (elements.length)
                return;
            
            if (parentPath.isVariableDeclarator()) {
                push(parentPath);
                return;
            }
            
            push(path);
        },
    });
};

