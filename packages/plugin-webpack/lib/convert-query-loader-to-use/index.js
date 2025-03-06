'use strict';

const {types, operator} = require('putout');
const {
    objectExpression,
    identifier,
    objectProperty,
    numericLiteral,
    stringLiteral,
    isStringLiteral,
    isIdentifier,
    arrayExpression,
} = types;
const {replaceWith} = operator;

module.exports.report = () => `"use" should be used instead of query in loaders`;

module.exports.fix = (path) => {
    const {node} = path;
    
    node.key.name = 'use';
    
    const valuePath = path.get('value');
    const [name, options] = valuePath.node.value.split('?');
    const object = buildObject(name, options);
    
    replaceWith(valuePath, arrayExpression([object]));
};

module.exports.traverse = ({push}) => ({
    ObjectExpression(path) {
        const properties = path.get('properties');
        
        for (const propPath of properties) {
            const {node} = propPath;
            
            const {key, value} = node;
            
            const isLoader = isIdentifier(key, {
                name: 'loader',
            });
            
            const isQuery = isStringLiteral(value) && value.value.includes('?');
            
            if (isLoader && isQuery)
                push(propPath);
        }
    },
});

function parseValue(value) {
    if (isNaN(value))
        return stringLiteral(value);
    
    return numericLiteral(Number(value));
}

function buildObject(name, options) {
    const allOptions = options.split('&');
    const properties = [];
    
    for (const option of allOptions) {
        const [key, value] = option.split('=');
        const parsed = parseValue(value);
        
        properties.push(objectProperty(identifier(key), parsed));
    }
    
    const loaderProp = objectProperty(identifier('loader'), stringLiteral(name));
    const optionsProp = objectProperty(identifier('options'), objectExpression(properties));
    
    return objectExpression([loaderProp, optionsProp]);
}
