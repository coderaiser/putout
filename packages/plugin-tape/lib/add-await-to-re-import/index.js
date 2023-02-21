'use strict';

const {types} = require('putout');
const {isFunction} = types;

module.exports.report = () => `Call 'reImport()' using await`;

module.exports.match = () => ({
    'reImport(__a)': (vars, path) => {
        const {parentPath} = path;
        
        if (parentPath.isAwaitExpression())
            return false;
        
        return true;
    },
});

module.exports.replace = () => ({
    'reImport(__a)': (vars, path) => {
        const fnPath = path.findParent(isFunction);
        
        if (fnPath)
            fnPath.node.async = true;
        
        return 'await reImport(__a)';
    },
});

