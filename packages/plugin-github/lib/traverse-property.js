'use strict';

const {operator} = require('putout');
const {traverse} = operator;

module.exports.traverseProperty = (node, name, fn) => {
    traverse(node, {
        '__object'(path) {
            for (const propertyPath of path.get('properties')) {
                const {value} = propertyPath.get('key').node;
                
                if (value === name)
                    fn(propertyPath);
            }
        },
    });
};
