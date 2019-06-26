'use strict';

const putout = require('putout');

const {
    operate,
    types,
} = putout;

const {replaceWith} = operate;
const {
    VariableDeclarator,
    ObjectPattern,
    ObjectProperty,
} = types;

module.exports = (path) => {
    const {node} = path;
    
    const {
        id,
        init,
    } = node;
    
    const computed = false;
    const shorthand = true;
    
    const property = ObjectProperty(id, id, computed, shorthand);
    const pattern = ObjectPattern([
        property,
    ]);
    
    replaceWith(path, VariableDeclarator(pattern, init.object));
};

