'use strict';

module.exports = (path) => {
    const [propertyPath] = path.get(`properties`);
    return propertyPath;
};

