'use strict';

const {
    isIdentifier,
    isMemberExpression,
} = require('@babel/types');

const isString = (a) => typeof a === 'string';

module.exports.getBinding = getBinding;
function getBinding(path, node) {
    const name = parseName(node);
    return path.scope.getAllBindings()[name];
}

module.exports.getBindingPath = (path, name) => getBinding(path, name)?.path;

const parseName = (node) => {
    if (isString(node))
        return node;
    
    if (isIdentifier(node))
        return node.name;
    
    if (isMemberExpression(node))
        return parseName(node.object);
    
    return '';
};
