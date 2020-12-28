'use strict';

module.exports = (path) => {
    const propertyPaths = path.get(`properties`);
    
    for (const propertyPath of propertyPaths) {
        return propertyPath;
    }
};

