'use strict';

module.exports = (name, path) => {
    const properties = path.get('properties');
    
    for (const property of properties) {
        const key = property.get('key');
        const is = isKey(name, key);
        
        if (is)
            return key;
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

