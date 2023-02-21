'use strict';

const {types} = require('putout');
const {
    BooleanLiteral,
    StringLiteral,
    ObjectProperty,
} = types;

const isCache = (property) => property.key.value === 'cache';

module.exports.report = () => '"cache" field should exist in travis';

module.exports.match = () => ({
    '__putout_processor_json(__a)'({__a}) {
        return !__a.properties.find(isCache);
    },
});

module.exports.replace = () => ({
    '__putout_processor_json(__a)'({__a}, path) {
        const property = ObjectProperty(StringLiteral('cache'), BooleanLiteral(false));
        __a.properties.push(property);
        
        return path;
    },
});

