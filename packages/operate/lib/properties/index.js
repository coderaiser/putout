import {types} from '@putout/babel';
import {extract} from '../extract.js';

export {traverseProperties} from './traverse-properties.js';

const {
    isObjectExpression,
    isObjectPattern,
} = types;

export const getProperties = (path, names) => {
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

export const getProperty = (path, name) => {
    if (!isObjectExpression(path) && !isObjectPattern(path))
        throw Error(`☝️Looks like path is not 'ObjectExpression | ObjectPattern', but: '${path.type}' for path: ${path}`);
    
    const propertyPaths = path.get(`properties`);
    
    for (const propertyPath of propertyPaths) {
        const keyPath = propertyPath.get('key');
        const currentName = extract(keyPath);
        
        if (currentName === name)
            return propertyPath;
    }
    
    return null;
};
