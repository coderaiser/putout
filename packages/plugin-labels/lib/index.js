'use strict';

const convertToObject = require('./convert-to-object');
const removeUnused = require('./remove-unused');

module.exports.rules = {
    'convert-to-object': convertToObject,
    'remove-unused': removeUnused,
};
