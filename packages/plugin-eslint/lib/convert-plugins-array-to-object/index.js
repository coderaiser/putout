'use strict';

const {types, operator} = require('putout');

const {extract, replaceWith} = operator;
const {
    isObjectProperty,
    ObjectExpression,
    ObjectProperty,
    isIdentifier,
} = types;

const COMPUTED = false;
const SHORTHAND = true;

module.exports.report = () => `Convert 'plugins' array to object`;

module.exports.fix = (path) => {
    const {elements} = path.node;
    const properties = [];
    
    for (const element of elements) {
        properties.push(ObjectProperty(element, element, COMPUTED, SHORTHAND));
    }
    
    replaceWith(path, ObjectExpression(properties));
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
