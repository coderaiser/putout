'use strict';

const applyConsistentBlocks = require('./apply-consistent-blocks');
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
const addReturn = require('./add-return');
const convertArrowToCondition = require('./convert-arrow-to-condition');
const reverseCondition = require('./reverse-condition');
const wrapWithBlock = require('./wrap-with-block');
const removeUselessLoopCondition = require('./remove-useless-loop-condition');
const mergeIfWithElse = require('./merge-if-with-else');

module.exports.rules = {
    'apply-comparison-order': applyComparisonOrder,
    'apply-consistent-blocks': applyConsistentBlocks,
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
    'add-return': addReturn,
    'convert-arrow-to-condition': convertArrowToCondition,
    'reverse-condition': reverseCondition,
    'wrap-with-block': wrapWithBlock,
    'remove-useless-loop-condition': removeUselessLoopCondition,
    'merge-if-with-else': mergeIfWithElse,
};
