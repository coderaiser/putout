'use strict';

const {types, operator} = require('putout');

const {replaceWith} = operator;
const {
    isFunction,
    AwaitExpression,
} = types;

module.exports.report = () => `Use 'await' near 'import' call`;

module.exports.match = () => ({
    'import(__a)'(vars, path) {
        if (!path.parentPath.isVariableDeclarator())
            return false;
        
        return !path.parentPath.isAwaitExpression();
    },
});

module.exports.replace = () => ({
    'import(__a)'(vars, path) {
        const fnPath = path.findParent(isFunction);
        
        if (fnPath)
            fnPath.node.async = true;
        
        return replaceWith(path, AwaitExpression(path.node));
    },
});
