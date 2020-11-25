const {operator, template} = require('putout');
const {getTemplateValues, traverse} = operator;

const {BooleanLiteral, NumericLiteral, isIdentifier, isStringLiteral, StringLiteral, ObjectProperty, ObjectMethod, Identifier, ObjectExpression, ReturnStatement} = require('putout').types;

const isCache = (property) => property.key.value === 'cache';

module.exports.report = () => '"cache" field should exist in travis';

module.exports.match= () => ({
    '__putout_processor_json(__a)'({__a}, path) {
        return !__a.properties.find(isCache);
    }
})

module.exports.replace = (options) => ({
    '__putout_processor_json(__a)'({__a}, path) {
        const property = ObjectProperty(StringLiteral('cache'), BooleanLiteral(false));
        __a.properties.push(property);
        
        return path;
    }
})

