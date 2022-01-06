'use strict';

const {types} = require('putout');
const {
    isArrayExpression,
    isStringLiteral,
} = types;

module.exports.getExtends = (node) => {
    const x = node.properties.find(isExtends);
    
    if (!x)
        return [];
    
    if (!isArrayExpression(x.value))
        return [];
    
    return x.value.elements;
};

function isExtends({key}) {
    return isStringLiteral(key, {
        value: 'extends',
    });
}

