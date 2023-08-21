'use strict';

const applyComparisonOrder = require('./apply-comparison-order');
const applyIf = require('./apply-if');
const evaluate = require('./evaluate');
const convertComparisonToBoolean = require('./convert-comparison-to-boolean');
const convertEqualToStrictEqual = require('./convert-equal-to-strict-equal');
const removeBoolean = require('./remove-boolean');
const removeZero = require('./remove-zero');
const simplify = require('./simplify');

module.exports.rules = {
    'apply-comparison-order': applyComparisonOrder,
    'apply-if': applyIf,
    evaluate,
    'convert-comparison-to-boolean': convertComparisonToBoolean,
    'convert-equal-to-strict-equal': convertEqualToStrictEqual,
    'remove-boolean': removeBoolean,
    'remove-zero': removeZero,
    simplify,
};
