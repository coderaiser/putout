'use strict';

const convertBooleanToString = require('./convert-boolean-to-string');
const removeEmpty = require('./remove-empty');
const MoveFormatterUp = require('./move-formatter-up');
const applyLabels = require('./apply-labels');

module.exports.rules = {
    'apply-labels': applyLabels,
    'convert-boolean-to-string': convertBooleanToString,
    'move-formatter-up': MoveFormatterUp,
    'remove-empty': removeEmpty,
};
