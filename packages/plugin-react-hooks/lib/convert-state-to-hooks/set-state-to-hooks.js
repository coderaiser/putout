'use strict';

const {template} = require('putout');

const buildHooks = template(`
    SETTER(VALUE);
`);

module.exports = (chunk) => {
    const {properties} = chunk.node.arguments[0];
    const nodes = [];
    
    for (const {key, value} of properties) {
        const {name} = key;
        const SETTER = getSetter(name);
        const VALUE = String(value.value);
        
        nodes.push(buildHooks({
            SETTER,
            VALUE,
        }));
    }
    
    chunk.replaceWithMultiple(nodes);
};

function getSetter(name) {
    const first = name[0].toUpperCase();
    const newName = [
        first,
        name.slice(1),
    ].join('');
    
    return `set${newName}`;
}

