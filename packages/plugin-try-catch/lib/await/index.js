'use strict';

const {types} = require('putout');
const {AwaitExpression} = types;

module.exports.report = () => `Use await with 'tryToCatch'`;

module.exports.match = () => ({
    'tryToCatch(__args)': (vars, path) => {
        if (path.parentPath.isAwaitExpression())
            return false;
        
        if (path.parentPath.isVariableDeclarator())
            return true;
        
        return path.parentPath.isExpressionStatement();
    },
});

module.exports.replace = () => ({
    'await tryCatch(__args)': 'await tryToCatch(__args)',
    'tryToCatch(__args)': (vars, path) => {
        const fn = path.getFunctionParent();
        
        if (fn)
            fn.node.async = true;
        
        return AwaitExpression(path.node);
    },
});
