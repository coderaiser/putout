'use strict';

const addMissingForAwait = require('./add-missing-for-await');
const addMissingForTemplate = require('./add-missing-for-template');

module.exports.rules = {
    'add-missing-for-awai': addMissingForAwait,
    'add-missing-for-template': addMissingForTemplate,
};
