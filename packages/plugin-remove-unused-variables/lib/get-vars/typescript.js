'use strict';

const {types} = require('putout');
const {isIdentifier} = types;

module.exports = (use) => ({
    TSTypeReference(path) {
        const {node} = path;
        const {typeName} = node;
        
        if (isIdentifier(typeName))
            use(path, typeName.name);
    },
    
    TSQualifiedName(path) {
        const {node} = path;
        const {left} = node;
        
        if (isIdentifier(left))
            use(path, left.name);
    },
});

