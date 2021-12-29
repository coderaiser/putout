'use strict';

const {extract} = require('./extract');

module.exports.findProperties = (path, names) => {
    const result = {};
    
    for (const propertyPath of path.get('properties')) {
        const keyPath = propertyPath.get('key');
        const currentName = extract(keyPath);
        
        if (names.includes(currentName)) {
            const name = `${currentName}Path`;
            result[name] = propertyPath;
            continue;
        }
    }
    
    return result;
};

