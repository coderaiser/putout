'use strict';

const {types, operator} = require('putout');
const {
    objectExpression,
    isObjectProperty,
    isIdentifier,
    objectProperty,
} = types;

const {extract, replaceWith} = operator;

const COMPUTED = false;
const SHORTHAND = true;

module.exports.report = () => `Convert 'plugins' array to object`;

module.exports.fix = (path) => {
    const {elements} = path.node;
    const properties = [];
    
    for (const element of elements) {
        properties.push(objectProperty(element, element, COMPUTED, SHORTHAND));
    }
    
    replaceWith(path, objectExpression(properties));
};

module.exports.traverse = ({push}) => ({
    ArrayExpression(path) {
        if (!isObjectProperty(path.parentPath))
            return;
        
        const keyPath = path.parentPath.get('key');
        const name = extract(keyPath);
        
        if (name !== 'plugins')
            return;
        
        const {elements} = path.node;
        
        for (const element of elements) {
            if (!isIdentifier(element))
                return;
        }
        
        push(path);
    },
});
