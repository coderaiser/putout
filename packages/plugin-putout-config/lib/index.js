'use strict';

const convertBooleanToString = require('./convert-boolean-to-string');
const removeEmpty = require('./remove-empty');
const MoveFormatterUp = require('./move-formatter-up');

module.exports.rules = {
    'convert-boolean-to-string': convertBooleanToString,
    'remove-empty': removeEmpty,
    'move-formatter-up': MoveFormatterUp,
};
