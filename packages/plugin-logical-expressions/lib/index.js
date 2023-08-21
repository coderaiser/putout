'use strict';

const simplify = require('./simplify');
const removeBoolean = require('./remove-boolean');
const removeDuplicates = require('./remove-duplicates');
const convertBitwiseToLogical = require('./convert-bitwise-to-logical');

module.exports.rules = {
    simplify,
    'remove-boolean': removeBoolean,
    'remove-duplicates': removeDuplicates,
    'convert-bitwise-to-logical': convertBitwiseToLogical,
};
