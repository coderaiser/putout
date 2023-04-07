'use strict';

const {operator} = require('putout');
const {isESM} = operator;

module.exports.report = () => `Use 'createTest(import.meta.url)' instead of 'createTest(__dirname)'`;

module.exports.match = () => ({
    'createTest(__dirname, __a)': (vars, path) => isESM(path),
});

module.exports.replace = () => ({
    'createTest(__dirname, __a)': 'createTest(import.meta.url, __a)',
});
