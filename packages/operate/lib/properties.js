'use strict';

const {extract} = require('./extract');

module.exports.getProperties = (path, names) => {
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

module.exports.getProperty = (path, name) => {
    const propertyPaths = path.get(`properties`);
    
    for (const propertyPath of propertyPaths) {
        const keyPath = propertyPath.get('key');
        const currentName = extract(keyPath);
        
        if (currentName === name)
            return propertyPath;
    }
    
    return null;
};

