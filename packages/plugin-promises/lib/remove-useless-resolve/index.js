'use strict';

const {types} = require('putout');

const {isFunction} = types;

module.exports.report = () => `Resolve is useless in async functions, use return value instead`;

const isAsync = (path) => {
    const fnPath = path.find(isFunction);
    
    return fnPath && fnPath.node.async;
};

module.exports.replace = () => ({
    'return Promise.resolve()': ({path}, skip) => {
        if (!isAsync(path))
            return skip;
        
        return 'return';
    },
    
    'return Promise.resolve(__a)': ({path}, skip) => {
        if (!isAsync(path))
            return skip;
        
        return `return __a`;
    },
});

