'use strict';

const {types, operator} = require('putout');
const fullstore = require('fullstore');
const {
    compare,
    traverseProperties,
    extract,
} = operator;

const {
    isSpreadElement,
    isIdentifier,
    isMemberExpression,
    isObjectProperty,
    isStringLiteral,
    isObjectPattern,
} = types;

const isSpreadId = (name) => (a) => isSpreadElement(a) && isIdentifier(a.argument, {
    name,
});

const isObjectPropertyId = (name, computed) => (a) => isObjectProperty(a, {
    computed,
}) && isIdentifier(a.key, {
    name,
});

const isMemberExpressionId = (name, computed) => (a) => isObjectProperty(a, {
    computed,
}) && name === extract(a.key);

const isObjectPropertyLiteral = (value) => (a) => isObjectProperty(a) && isStringLiteral(a.key, {
    value,
});

const store = fullstore([]);

module.exports.report = () => 'Avoid duplicate keys';

module.exports.replace = () => ({
    __object: ({__object}) => {
        __object.properties = store();
        store([]);
        
        return __object;
    },
});

module.exports.match = () => ({
    __object: ({__object}, path) => {
        let is = false;
        const newProperties = [];
        const {properties} = __object;
        
        const reversed = properties
            .slice()
            .reverse();
        
        for (const prop of reversed) {
            if (isObjectPattern(path) && !compare(prop.key, prop.value))
                continue;
            
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
                
                const props = traverseProperties(path, name, {
                    firstLevel: true,
                });
                
                if (props.length > 1) {
                    const isFirst = checkIfFirst(properties, newProperties, isObjectPropertyId, name, {
                        computed,
                    });
                    
                    if (!isFirst) {
                        is = true;
                        continue;
                    }
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
            
            if (isObjectProperty(prop) && isMemberExpression(prop.key)) {
                const {computed} = prop;
                const name = extract(prop.key);
                
                const props = traverseProperties(path, name, {
                    firstLevel: true,
                });
                
                if (props.length > 1) {
                    const isFirst = checkIfFirst(properties, newProperties, isMemberExpressionId, name, {
                        computed,
                    });
                    
                    if (!isFirst) {
                        is = true;
                        continue;
                    }
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
    
    return !newLength || oldLength <= 1;
}
