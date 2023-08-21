'use strict';

const applyLiteralNotation = require('./apply-literal-notation');
const applyStartsWith = require('./apply-starts-with');
const applyEndsWith = require('./apply-ends-with');
const optimize = require('./optimize');
const convertToString = require('./convert-to-string');
const convertReplaceToReplaceAll = require('./convert-replace-to-replace-all');
const removeUselessGroup = require('./remove-useless-group');
const removeUselessRegexp = require('./remove-useless-regexp');

module.exports.rules = {
    'apply-literal-notation': applyLiteralNotation,
    'apply-starts-with': applyStartsWith,
    'apply-ends-with': applyEndsWith,
    optimize,
    'convert-to-string': convertToString,
    'convert-replace-to-replace-all': convertReplaceToReplaceAll,
    'remove-useless-group': removeUselessGroup,
    'remove-useless-regexp': removeUselessRegexp,
};
