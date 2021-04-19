'use strict';

const {operator, types} = require('putout');
const {replaceWith} = operator;
const {
    ReturnStatement,
    ThrowStatement,
    isFunction,
} = types;

module.exports.report = () => 'Async functions should be used instead of new Promise';

module.exports.replace = () => ({
    'return new Promise(__a)'({__a}, path) {
        replaceWith(path, __a.body);
        path.find(isFunction).node.async = true;
        return path;
    },
    
    'reject(__a)': ({__a}, path) => {
        replaceWith(path.parentPath, ThrowStatement(__a));
        return path;
    },
    'resolve(__a)': ({__a}, path) => {
        replaceWith(path.parentPath, ReturnStatement(__a));
        return path;
    },
    'resolve()': '',
});
