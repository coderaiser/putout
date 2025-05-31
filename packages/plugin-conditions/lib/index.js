import * as applyConsistentBlocks from './apply-consistent-blocks/index.js';
import * as applyComparisonOrder from './apply-comparison-order/index.js';
import * as applyIf from './apply-if/index.js';
import * as evaluate from './evaluate/index.js';
import * as convertComparisonToBoolean from './convert-comparison-to-boolean/index.js';
import * as convertEqualToStrictEqual from './convert-equal-to-strict-equal/index.js';
import * as mergeIfStatements from './merge-if-statements/index.js';
import * as removeBoolean from './remove-boolean/index.js';
import removeZero from './remove-zero/index.js';
import * as removeUselessElse from './remove-useless-else/index.js';
import * as simplify from './simplify/index.js';
import * as removeSameValuesCondition from './remove-same-values-condition/index.js';
import * as addReturn from './add-return/index.js';
import * as convertArrowToCondition from './convert-arrow-to-condition/index.js';
import * as reverseCondition from './reverse-condition/index.js';
import * as wrapWithBlock from './wrap-with-block/index.js';
import * as removeUselessLoopCondition from './remove-useless-loop-condition/index.js';
import * as mergeIfWithElse from './merge-if-with-else/index.js';

export const rules = {
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
