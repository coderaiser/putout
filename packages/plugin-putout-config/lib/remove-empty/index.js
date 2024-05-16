'use strict';

const {operator} = require('putout');
const {remove} = operator;

module.exports.report = () => 'Avoid empty property values';

module.exports.fix = (path) => {
    remove(path.parentPath);
};

module.exports.include = () => [
    'ObjectExpression',
    'ArrayExpression',
];

module.exports.filter = (path) => {
    const {parentPath, node} = path;
    
    const {properties, elements} = node;
    
    if (!parentPath.isObjectProperty())
        return false;
    
    const key = parentPath.get('key').node.value;
    
    if (!/rules|match|plugins/.test(key))
        return false;
    
    if (path.isObjectExpression())
        return !properties.length;
    
    return !elements.length;
};
