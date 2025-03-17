'use strict';

const {types, operator} = require('putout');

const {getBinding} = operator;
const {isIdentifier} = types;

module.exports.report = () => `Avoid useless assignment`;

module.exports.match = () => ({
    '(__a = __b).__c': ({__a}, path) => {
        if (!isIdentifier(__a))
            return false;
        
        const binding = getBinding(path, __a.name);
        
        if (!binding)
            return false;
        
        const {references} = binding;
        
        return !references;
    },
});

module.exports.replace = () => ({
    '(__a = __b).__c': '__b.__c',
});

