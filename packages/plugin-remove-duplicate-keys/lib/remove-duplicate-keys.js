'use strict';

const {types} = require('putout');
const fullstore = require('fullstore');
const {
    isSpreadElement,
    isIdentifier,
    isObjectProperty,
    isStringLiteral,
} = types;

const isSpreadId = (name) => (a) => isSpreadElement(a) && isIdentifier(a.argument, {name});
const isObjectPropertyId = (name, computed) => (a) => isObjectProperty(a, {computed}) && isIdentifier(a.key, {name});
const isObjectPropertyLiteral = (value) => (a) => isObjectProperty(a) && isStringLiteral(a.key, {value});

const store = fullstore([]);

module.exports.report = () => 'Duplicate keys should be avoided';

module.exports.replace = () => ({
    __object: ({__object}) => {
        __object.properties = store();
        store([]);
        
        return __object;
    },
});

module.exports.match = () => ({
    __object: ({__object}) => {
        let is = false;
        const newProperties = [];
        const {properties} = __object;
        const reversed = properties.slice().reverse();
        
        for (const prop of reversed) {
            if (isSpreadElement(prop) && isIdentifier(prop.argument)) {
                const {name} = prop.argument;
                const isFirst = checkIfFirst(properties, newProperties, isSpreadId, name);
                
                if (!isFirst) {
                    is = true;
                    continue;
                }
            }
            
            if (isObjectProperty(prop) && isIdentifier(prop.key)) {
                const {computed} = prop;
                const {name} = prop.key;
                const isFirst = checkIfFirst(properties, newProperties, isObjectPropertyId, name, {
                    computed,
                });
                
                if (!isFirst) {
                    is = true;
                    continue;
                }
            }
            
            if (isObjectProperty(prop) && isStringLiteral(prop.key)) {
                const {value} = prop.key;
                const isFirst = checkIfFirst(properties, newProperties, isObjectPropertyLiteral, value);
                
                if (!isFirst) {
                    is = true;
                    continue;
                }
            }
            
            newProperties.unshift(prop);
        }
        
        if (is)
            store(newProperties);
        
        return is;
    },
});

function checkIfFirst(properties, newProperties, isFn, str, {computed} = {}) {
    const oldLength = properties.filter(isFn(str, computed)).length;
    const newLength = newProperties.filter(isFn(str, computed)).length;
    
    if (newLength && oldLength > 1)
        return false;
    
    return true;
}

