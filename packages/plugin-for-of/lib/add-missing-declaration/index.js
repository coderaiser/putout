'use strict';

const {types} = require('putout');
const {isVariableDeclaration} = types;

module.exports.report = () => `Add missing declaration`;

module.exports.match = () => ({
    'for (__a of __b) __c': ({__a}, path) => {
        if (isVariableDeclaration(__a))
            return false;
        
        const bindings = path.scope.getAllBindings();
        
        return !bindings[__a.name];
    },
});

module.exports.replace = () => ({
    'for (__a of __b) __c': 'for (const __a of __b) __c',
});
