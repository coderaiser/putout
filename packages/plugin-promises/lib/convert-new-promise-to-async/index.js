'use strict';

const {operator, types} = require('putout');
const {replaceWith, traverse} = operator;
const {
    ReturnStatement,
    ThrowStatement,
} = types;

module.exports.report = () => 'Async functions should be used instead of new Promise';

module.exports.replace = () => ({
    'return new Promise(__a)'({__a}, path) {
        const {scope} = path.get('argument.arguments.0');
        
        let exclude = false;
        
        traverse(path, {
            'reject(__)': (rejectPath) => {
                const {node} = rejectPath.get('arguments.0');
                
                if (scope === rejectPath.scope.getFunctionParent())
                    replaceWith(rejectPath.parentPath, ThrowStatement(node));
            },
            'resolve(__)': (resolvePath) => {
                const {node} = resolvePath.get('arguments.0');
                
                if (scope === resolvePath.scope.getFunctionParent())
                    replaceWith(resolvePath.parentPath, ReturnStatement(node));
            },
            'resolve()': (resolvePath) => {
                if (scope === resolvePath.scope.getFunctionParent())
                    resolvePath.parentPath.remove();
            },
            'resolve': (path) => {
                if (checkIdentifier(path))
                    exclude = true;
            },
            'reject': (path) => {
                if (checkIdentifier(path))
                    exclude = true;
            },
        });
        
        if (exclude)
            return path;
        
        const fn = path.scope.getFunctionParent().path.node;
        fn.async = true;
        
        return __a.body;
    },
});

function checkIdentifier(path) {
    const {parentPath} = path;
    
    if (parentPath.isFunction() && path === parentPath.get('params.0'))
        return false;
    
    const calleePath = parentPath.get('callee');
    
    if (parentPath.isCallExpression() && calleePath !== path)
        return true;
    
    return false;
}

