'use strict';

const {
    types,
    operator,
} = require('putout');

const {replaceWith} = operator;

const {
    ArrayExpression,
    StringLiteral,
    isStringLiteral,
    isIdentifier,
} = types;

module.exports.report = () => `"use" should be used instead of exclamation mark in loaders`;

module.exports.fix = (path) => {
    const {node} = path;
    
    node.key.name = 'use';
    
    const valuePath = path.get('value');
    const elements = [];
    const names = valuePath.node.value.split('!');
    
    for (const name of names) {
        elements.push(StringLiteral(name));
    }
    
    replaceWith(valuePath, ArrayExpression(elements));
};

module.exports.traverse = ({push}) => ({
    ObjectExpression(path) {
        const properties = path.get('properties');
        
        for (const propPath of properties) {
            const {node} = propPath;
            
            const {
                key,
                value,
            } = node;
            
            const isLoader = isIdentifier(key, {
                name: 'loader',
            });
            
            const isExclamation = isStringLiteral(value) && value.value.includes('!');
            
            if (isLoader && isExclamation)
                push(propPath);
        }
    },
});
