'use strict';

const template = require('@babel/template').default;

const buildHooks = template(`
    SETTER(VALUE);
`);

module.exports = (path) => {
    const {properties} = path.node.arguments[0];
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
    
    path.replaceWithMultiple(nodes);
};

function getSetter(name) {
    const first = name[0].toUpperCase();
    const newName = [
        first,
        name.slice(1),
    ].join('');
    
    return `set${newName}`;
}

