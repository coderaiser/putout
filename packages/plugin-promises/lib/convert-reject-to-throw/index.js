'use strict';

const {types} = require('putout');

const {isFunction} = types;

module.exports.report = () => 'Reject is useless in async functions, use throw instead';

module.exports.filter = (path) => {
    const fnPath = path.find(isFunction);
    return fnPath && fnPath.node.async;
};

module.exports.replace = () => ({
    'return Promise.reject(__a)': 'throw __a',
});

