'use strict';

const {operator} = require('putout');
const {remove} = operator;

module.exports.report = () => `Avoid empty nested patterns`;

module.exports.fix = (path) => remove(path.parentPath);

module.exports.filter = (path) => {
    if (path.isArrayPattern() && path.node.elements.length)
        return false;
    
    if (path.isObjectPattern() && path.node.properties.length)
        return false;
    
    return path.parentPath.isObjectProperty();
};

module.exports.include = () => [
    'ArrayPattern',
    'ObjectPattern',
];
