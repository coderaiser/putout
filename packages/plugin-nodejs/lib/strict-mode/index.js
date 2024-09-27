'use strict';

const addMissing = require('./add-missing');
const removeUseless = require('./remove-useless');
const removeIlligal = require('./remove-illigal');

module.exports.rules = {
    'add-missing': addMissing,
    'remove-useless': removeUseless,
    'remove-illigal': removeIlligal,
};
