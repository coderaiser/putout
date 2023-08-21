'use strict';

const addMissing = require('./add-missing');
const removeUseless = require('./remove-useless');

module.exports.rules = {
    'add-missing': addMissing,
    'remove-useless': removeUseless,
};
