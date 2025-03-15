'use strict';

const {types} = require('putout');
const {
    isVariableDeclaration,
    isIdentifier,
    isArrayPattern,
    isObjectPattern,
} = types;

module.exports.report = () => `Add missing declaration`;

module.exports.match = () => ({
    'for (__a of __b) __c': ({__a}, path) => {
        if (isVariableDeclaration(__a))
            return false;
        
        const bindings = path.scope.getAllBindings();
        
        if (isIdentifier(__a))
            return !bindings[__a.name];
        
        if (isArrayPattern(__a)) {
            for (const element of __a.elements) {
                if (!isIdentifier(element) || bindings[element.name])
                    return false;
            }
            
            return true;
        }
        
        if (isObjectPattern(__a))
            for (const property of __a.properties) {
                if (property.computed)
                    return false;
                
                if (!isIdentifier(property.key) || bindings[property.key.name])
                    return false;
            }
        
        return true;
    },
});

module.exports.replace = () => ({
    'for (__a of __b) __c': 'for (const __a of __b) __c',
});
