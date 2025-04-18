import {types, operator} from 'putout';

const {
    arrayExpression,
    isStringLiteral,
    isIdentifier,
    stringLiteral,
} = types;

const {replaceWith} = operator;

export const report = () => `"use" should be used instead of exclamation mark in loaders`;

export const fix = (path) => {
    const {node} = path;
    
    node.key.name = 'use';
    
    const valuePath = path.get('value');
    const elements = [];
    const names = valuePath.node.value.split('!');
    
    for (const name of names) {
        elements.push(stringLiteral(name));
    }
    
    replaceWith(valuePath, arrayExpression(elements));
};

export const traverse = ({push}) => ({
    ObjectExpression(path) {
        const properties = path.get('properties');
        
        for (const propPath of properties) {
            const {node} = propPath;
            
            const {key, value} = node;
            
            const isLoader = isIdentifier(key, {
                name: 'loader',
            });
            
            const isExclamation = isStringLiteral(value) && value.value.includes('!');
            
            if (isLoader && isExclamation)
                push(propPath);
        }
    },
});
