import * as sortIgnore from './sort-ignore/index.js';
import * as applyArguments from './apply-arguments/index.js';
import * as applyDestructuring from './apply-destructuring/index.js';
import * as applyAssignment from './apply-assignment/index.js';
import * as applyConditions from './apply-conditions/index.js';
import * as applyEsm from './apply-esm/index.js';
import * as applyOptionalChaining from './apply-optional-chaining/index.js';
import * as applyParens from './apply-parens/index.js';
import * as applyReturn from './apply-return/index.js';
import * as applyForOf from './apply-for-of/index.js';
import * as applyLabels from './apply-labels/index.js';
import * as applyMath from './apply-math/index.js';
import * as applyNodejs from './apply-nodejs/index.js';
import * as applyPromises from './apply-promises/index.js';
import * as applySpread from './apply-spread/index.js';
import * as applyTape from './apply-tape/index.js';
import * as applyTypes from './apply-types/index.js';
import * as applyVariables from './apply-variables/index.js';
import * as convertBooleanToString from './convert-boolean-to-string/index.js';
import * as renameRules from './rename-rules/index.js';
import * as removeEmpty from './remove-empty/index.js';
import * as MoveFormatterUp from './move-formatter-up/index.js';
import * as removeEmptyFile from './remove-empty-file/index.js';

export const rules = {
    'apply-arguments': applyArguments,
    'apply-destructuring': applyDestructuring,
    'apply-assignment': applyAssignment,
    'apply-conditions': applyConditions,
    'apply-esm': applyEsm,
    'apply-for-of': applyForOf,
    'apply-labels': applyLabels,
    'apply-math': applyMath,
    'apply-nodejs': applyNodejs,
    'apply-optional-chaining': applyOptionalChaining,
    'apply-parens': applyParens,
    'apply-promises': applyPromises,
    'apply-return': applyReturn,
    'apply-spread': applySpread,
    'apply-tape': applyTape,
    'apply-types': applyTypes,
    'apply-variables': applyVariables,
    'convert-boolean-to-string': convertBooleanToString,
    'move-formatter-up': MoveFormatterUp,
    'rename-rules': renameRules,
    'remove-empty': removeEmpty,
    'remove-empty-file': ['off', removeEmptyFile],
    'sort-ignore': sortIgnore,
};
