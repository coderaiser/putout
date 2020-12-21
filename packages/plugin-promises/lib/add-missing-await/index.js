'use strict';

const {types} = require('putout');

const {
    isIdentifier,
    AwaitExpression,
} = types;

module.exports.report = () => 'Async functions should be called using await';

module.exports.match = () => ({
    '__a(__args)': ({__a}, path) => {
        if (!isIdentifier(__a))
            return false;
        
        if (path.parentPath.isArrayExpression())
            return false;
        
        const {name} = __a;
        const binding = path.scope.getAllBindings()[name];
        
        if (!binding)
            return false;
        
        if (!binding.path.isFunction())
            return false;
        
        if (!binding.path.node.async)
            return false;
        
        return !path.parentPath.isAwaitExpression();
    },
});

module.exports.replace = () => ({
    '__a(__args)': (vars, path) => {
        const fnPath = path.getFunctionParent();
        
        if (fnPath && !fnPath.node.async)
            fnPath.node.async = true;
        
        return AwaitExpression(path.node);
    },
});

