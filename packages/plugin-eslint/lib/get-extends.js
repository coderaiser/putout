'use strict';

const {types} = require('putout');
const {
    isArrayExpression,
    isStringLiteral,
} = types;

module.exports.getExtends = (node) => {
    const x = node.properties.find(isExtends);
    
    if (!x)
        return null;
    
    if (!isArrayExpression(x.value))
        return null;
    
    return x.value.elements;
};

function isExtends({key}) {
    return isStringLiteral(key, {
        value: 'extends',
    });
}

