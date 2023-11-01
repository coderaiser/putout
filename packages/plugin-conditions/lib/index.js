'use strict';

const applyComparisonOrder = require('./apply-comparison-order');
const applyIf = require('./apply-if');
const evaluate = require('./evaluate');
const convertComparisonToBoolean = require('./convert-comparison-to-boolean');
const convertEqualToStrictEqual = require('./convert-equal-to-strict-equal');
const mergeIfStatements = require('./merge-if-statements');
const removeBoolean = require('./remove-boolean');
const removeZero = require('./remove-zero');
const removeUselessElse = require('./remove-useless-else');
const simplify = require('./simplify');
const removeSameValuesCondition = require('./remove-same-values-condition');

module.exports.rules = {
    'apply-comparison-order': applyComparisonOrder,
    'apply-if': applyIf,
    evaluate,
    'convert-comparison-to-boolean': convertComparisonToBoolean,
    'convert-equal-to-strict-equal': convertEqualToStrictEqual,
    'merge-if-statements': mergeIfStatements,
    'remove-boolean': removeBoolean,
    'remove-zero': removeZero,
    'remove-useless-else': removeUselessElse,
    simplify,
    'remove-same-values-condition': removeSameValuesCondition,
};
