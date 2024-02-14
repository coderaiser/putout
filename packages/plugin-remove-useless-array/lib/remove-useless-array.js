'use strict';

const {replaceWith} = require('putout').operator;

module.exports.report = () => `Avoid array inside property accessors`;

module.exports.include = () => [
    'ArrayExpression',
];

module.exports.fix = (path) => {
    replaceWith(path, path.node.elements[0]);
};

module.exports.filter = (path) => {
    const {parentPath} = path;
    
    if (path === parentPath.get('object'))
        return false;
    
    if (path.node.elements.length > 1)
        return false;
    
    return parentPath.isMemberExpression();
};
