'use strict';

const {types} = require('putout');
const {
    isStringLiteral,
    isArrayExpression,
} = types;

module.exports.getPlugins = get();
module.exports.getExtends = get();

module.exports.getRules = (node) => {
    const x = node.properties.find(is('rules'));
    
    if (!x)
        return [];
    
    return x.value.properties;
};

function get() {
    return (node) => {
        const x = node.properties.find(is('extends'));
        
        if (!x)
            return [];
        
        if (!isArrayExpression(x.value))
            return [];
        
        return x.value.elements;
    };
}

const is = (name) => ({key}) => {
    return isStringLiteral(key, {
        value: name,
    });
};

