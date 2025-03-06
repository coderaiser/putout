'use strict';

const {types, operator} = require('putout');

const {replaceWith} = operator;
const {objectProperty} = types;

module.exports.report = () => 'Object Property should be used instead of Method';

module.exports.include = () => [
    'ObjectMethod',
];

module.exports.filter = (path) => {
    if (!path.node.params.length)
        return false;
    
    const firstPath = path.get('params.0');
    
    if (!firstPath.isObjectPattern())
        return false;
    
    return !firstPath.node.properties.length;
};

module.exports.fix = (path) => {
    const keyPath = path.get('key');
    
    path.node.type = 'ArrowFunctionExpression';
    path.node.id = null;
    
    replaceWith(path, objectProperty(keyPath.node, path.node));
};
