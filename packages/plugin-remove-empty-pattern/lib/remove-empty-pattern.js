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

module.exports.find = (ast, {traverse}) => {
    const places = [];
    
    traverse(ast, {
        VariableDeclarator(path) {
            const {id} = path.node;
            
            if (isObjectPattern(id) && !id.properties.length) {
                places.push(path);
                return;
            }
            
            if (isArrayPattern(id) && !id.elements.length) {
                places.push(path);
                return;
            }
        }
    });
    
    return places;
};

