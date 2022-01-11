'use strict';

module.exports.getProperty = (path, name) => {
    const propertyPaths = path.get(`properties`);
    
    for (const propertyPath of propertyPaths) {
        const key = propertyPath.get('key');
        const is = isKey(name, key);
        
        if (is)
            return propertyPath;
    }
    
    return null;
};

function isKey(name, key) {
    const isId = key.isIdentifier({name});
    const isStr = key.isStringLiteral({
        value: name,
    });
    
    return isStr || isId;
}

