'use strict';

const {operator} = require('putout');
const {isESM} = operator;
const not = (fn) => (...a) => !fn(...a);

module.exports.report = () => `Use __dirname instead of 'import.meta.url' in CommonJS`;

module.exports.filter = not(isESM);

module.exports.replace = () => ({
    'new URL(__a, import.meta.url).pathname': 'join(__dirname, __a)',
});
