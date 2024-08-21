'use strict';

const {operator} = require('putout');
const {remove} = operator;

module.exports.report = () => 'try-catch arguments should be expanded';

module.exports.match = () => ({
    'tryCatch(__args)': ({__args}, path) => {
        const [fn] = __args;
        const {name} = fn;
        const {bindings} = path.scope;
        
        if (!bindings[name])
            return false;
        
        const initPath = bindings[name].path.get('init');
        
        if (!initPath.isFunction())
            return false;
        
        const bodyPath = initPath.get('body');
        
        return bodyPath.isCallExpression();
    },
});

module.exports.replace = () => ({
    'tryCatch(__args)': ({__args}, path) => {
        const [fn] = __args;
        const {name} = fn;
        const {bindings} = path.scope;
        
        const fnPath = bindings[name].path;
        const {node} = fnPath.get('init.body');
        
        if (path.node.arguments.length === 1)
            path.node.arguments = [node.callee, ...node.arguments];
        else
            path.node.arguments[0] = node.callee;
        
        remove(fnPath);
        
        return path;
    },
});
