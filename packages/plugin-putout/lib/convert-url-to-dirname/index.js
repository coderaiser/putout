'use strict';

const {operator} = require('putout');
const {isESM} = operator;

module.exports.report = () => `Use 'createTest(__dirname)' instead of 'createTest(import.meta.url)' in CommonJS'`;

module.exports.match = () => ({
    'createTest(import.meta.url, __a)': (vars, path) => !isESM(path),
});

module.exports.replace = () => ({
    'createTest(import.meta.url, __a)': 'createTest(__dirname, __a)',
});
