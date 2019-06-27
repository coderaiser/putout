'use strict';

const {types} = require('putout');
const {isIdentifier} = types;

module.exports = (use) => ({
    GenericTypeAnnotation(path) {
        const {node} = path;
        const {id} = node;
        
        if (isIdentifier(id))
            use(path, id.name);
    },
});

