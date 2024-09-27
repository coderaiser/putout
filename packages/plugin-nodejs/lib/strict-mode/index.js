'use strict';

const addMissing = require('./add-missing');
const removeUseless = require('./remove-useless');
const removeIllegal = require('./remove-illegal');

module.exports.rules = {
    'add-missing': addMissing,
    'remove-useless': removeUseless,
    'remove-illegal': removeIllegal,
};
