'use strict';

const {operator} = require('putout');
const {isESM} = operator;

module.exports.report = () => `Use 'import.meta.url' instead of '__dirname'`;

module.exports.filter = isESM;

module.exports.replace = () => ({
    'join(__dirname, __a)': 'new URL(__a, import.meta.url).pathname',
    'path.join(__dirname, __a)': 'new URL(__a, import.meta.url).pathname',
});
