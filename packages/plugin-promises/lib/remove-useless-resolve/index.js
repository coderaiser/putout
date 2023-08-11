'use strict';

const {types} = require('putout');
const {isFunction} = types;

module.exports.report = () => `'resolve()' is useless in 'async' functions, use 'return' instead`;

module.exports.filter = (path) => {
    const fnPath = path.find(isFunction);
    return fnPath?.node.async;
};

module.exports.replace = () => ({
    'return Promise.resolve()': 'return',
    'return Promise.resolve(__a)': `return __a`,
    'await Promise.resolve(__a)': `__a`,
});
