'use strict';

const convertBooleanToString = require('./convert-boolean-to-string');
const removeEmpty = require('./remove-empty');

module.exports.rules = {
    'convert-boolean-to-string': convertBooleanToString,
    'remove-empty': removeEmpty,
};
