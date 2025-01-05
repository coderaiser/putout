'use strict';

const {types} = require('putout');
const {
    isStringLiteral,
    isArrayExpression,
} = types;

module.exports.isPlugins = (node) => node.properties.find(is('plugins'));
module.exports.isExtends = (node) => node.properties.find(is('extends'));

module.exports.getPlugins = get('plugins');
module.exports.getExtends = get('extends');

module.exports.getRules = (node) => {
    const x = node.properties.find(is('rules'));
    
    if (!x)
        return [];
    
    return x.value.properties;
};

function get(name) {
    return (node) => {
        const x = node.properties.find(is(name));
        
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
