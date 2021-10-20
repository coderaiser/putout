'use strict';

const {operator} = require('putout');

const {traverse} = operator;

module.exports.traverseProperty = (node, name, fn) => {
    traverse(node, {
        '__object'(path) {
            const propertyPath = path.get('properties.0');
            const {value} = propertyPath.get('key').node;
            
            if (value === name)
                fn(propertyPath);
        },
    });
};
