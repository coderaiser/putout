'use strict';

const addType = require('./add-type');
const removeNyc = require('./remove-nyc');
const removeCommitType = require('./remove-commit-type');

module.exports.rules = {
    'add-type': addType,
    'remove-nyc': removeNyc,
    'remove-commit-type': removeCommitType,
};
