'use strict';

const {operator} = require('putout');
const {compareAny} = operator;

module.exports.report = () => `Use 'vars' instead of '{}'`;

module.exports.match = () => ({
    '({}, path) => __a': isInsideReplacer,
});

module.exports.replace = () => ({
    '({}, path) => __a': '(vars, path) => __a',
});

const isInsideReplacer = (vars, path) => {
    return compareAny(path, [
        'module.exports.match = __',
        'module.exports.replace = __',
        'export const match = __',
        'export const replace = __',
    ]);
};
