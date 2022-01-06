'use strict';

const {types} = require('putout');
const {isStringLiteral} = types;

module.exports.getRules = (node) => {
    const x = node.properties.find(isRules);
    
    if (!x)
        return [];
    
    return x.value.properties;
};

function isRules({key}) {
    return isStringLiteral(key, {
        value: 'rules',
    });
}

