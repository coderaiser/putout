'use strict';

const {isObjectExpression} = require('@putout/babel').types;
const {extract} = require('../extract');
const {traverseProperties} = require('./traverse-properties');

module.exports.traverseProperties = traverseProperties;

module.exports.getProperties = (path, names) => {
    const result = {};
    
    for (const propertyPath of path.get('properties')) {
        if (propertyPath.isSpreadElement())
            continue;
        
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
    if (!isObjectExpression(path))
        throw Error(`☝️Looks like path is not 'ObjectExpression', but: '${path.type}' for path: ${path}`);
    
    const propertyPaths = path.get(`properties`);
    
    for (const propertyPath of propertyPaths) {
        const keyPath = propertyPath.get('key');
        const currentName = extract(keyPath);
        
        if (currentName === name)
            return propertyPath;
    }
    
    return null;
};
