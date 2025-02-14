'use strict';

const addMissingForAwait = require('./add-missing-for-await');
const addMissingForTemplate = require('./add-missing-for-template');
const addMissingForAssign = require('./add-missing-for-assign');
const removeUselessForAwait = require('./remove-useless-for-await');
const removeUselessForParams = require('./remove-useless-for-params');

module.exports.rules = {
    'add-missing-for-awai': addMissingForAwait,
    'add-missing-for-template': addMissingForTemplate,
    'add-missing-for-assign': addMissingForAssign,
    'remove-useless-for-await': removeUselessForAwait,
    'remove-useless-for-params': removeUselessForParams,
};
