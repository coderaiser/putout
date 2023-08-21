'use strict';

const addMadrunToLint = require('./add-madrun-to-lint');
const addFreshLint = require('./add-fresh-lint');
const renamePredefinedEslintToPutout = require('./rename-predefined-eslint-to-putout');

module.exports.rules = {
    'add-madrun-to-lint': addMadrunToLint,
    'add-fresh-lint': addFreshLint,
    'rename-predefined-eslint-to-putout': renamePredefinedEslintToPutout,
};
