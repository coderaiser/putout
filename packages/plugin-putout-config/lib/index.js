'use strict';

const applyConditions = require('./apply-conditions');
const applyForOf = require('./apply-for-of');
const applyLabels = require('./apply-labels');
const applyNodejs = require('./apply-nodejs');
const applyPromises = require('./apply-promises');
const applyTape = require('./apply-tape');
const convertBooleanToString = require('./convert-boolean-to-string');
const removeEmpty = require('./remove-empty');
const MoveFormatterUp = require('./move-formatter-up');

module.exports.rules = {
    'apply-conditions': applyConditions,
    'apply-for-of': applyForOf,
    'apply-labels': applyLabels,
    'apply-nodejs': applyNodejs,
    'apply-promises': applyPromises,
    'apply-tape': applyTape,
    'convert-boolean-to-string': convertBooleanToString,
    'move-formatter-up': MoveFormatterUp,
    'remove-empty': removeEmpty,
};
