import * as applyLiteralNotation from './apply-literal-notation/index.js';
import * as applyStartsWith from './apply-starts-with/index.js';
import * as applyEndsWith from './apply-ends-with/index.js';
import * as optimize from './optimize/index.js';
import * as convertToString from './convert-to-string/index.js';
import * as convertReplaceToReplaceAll from './convert-replace-to-replace-all/index.js';
import * as removeUselessGroup from './remove-useless-group/index.js';
import * as removeUselessRegexp from './remove-useless-regexp/index.js';

export const rules = {
    'apply-literal-notation': applyLiteralNotation,
    'apply-starts-with': applyStartsWith,
    'apply-ends-with': applyEndsWith,
    optimize,
    'convert-to-string': convertToString,
    'convert-replace-to-replace-all': convertReplaceToReplaceAll,
    'remove-useless-group': removeUselessGroup,
    'remove-useless-regexp': removeUselessRegexp,
};
