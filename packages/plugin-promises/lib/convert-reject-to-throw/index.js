'use strict';

const {types} = require('putout');

const {isFunction} = types;

module.exports.report = () => 'Reject is useless in async functions, use throw instead';

module.exports.replace = () => ({
    'return Promise.reject(__a)': ({path}, skip) => {
        const fnPath = path.find(isFunction);
        
        if (!fnPath || !fnPath.node.async)
            return skip;
        
        return 'throw __a';
    },
});

