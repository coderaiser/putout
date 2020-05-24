'use strict';

const debug = require('debug')('putout:compare');

const {isArray} = Array;
const isObject = (a) => a && typeof a === 'object';

module.exports = (a, b) => {
    if (!debug.enabled)
        return;
    
    const parsedValue = parseValue(a);
    const parsedPathValue = parseValue(b);
    
    return debug(`${parsedValue} = ${parsedPathValue}`);
};

module.exports._parseValue = parseValue;
function parseValue(a) {
    if (isArray(a) && a[0]) {
        const [{type, name, value}] = a;
        return `${type}: ["${name || value}"]`;
    }
    
    if (isObject(a)) {
        const {
            type,
            name,
            value,
        } = a;
        
        return `${type}: "${name || value}"`;
    }
    
    return `${typeof a}: "${a}"`;
}

