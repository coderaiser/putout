'use strict';

const {types} = require('putout');
const {isFunction} = types;

module.exports.report = () => `Resolve is useless in async functions, use return value instead`;

module.exports.filter = (path) => {
    const fnPath = path.find(isFunction);
    return fnPath && fnPath.node.async;
};

module.exports.replace = () => ({
    'return Promise.resolve()': 'return',
    'return Promise.resolve(__a)': `return __a`,
});

