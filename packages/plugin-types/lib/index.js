import * as applyIsArray from './apply-is-array/index.js';
import * as declare from './declare/index.js';
import * as convertTypeofToIsType from './convert-typeof-to-is-type/index.js';
import * as removeUselessConversion from './remove-useless-conversion/index.js';
import * as removeUselessConstructor from './remove-useless-constructor/index.js';
import * as removeDoubleNegations from './remove-double-negations/index.js';
import * as removeUselessTypeof from './remove-useless-typeof/index.js';

export const rules = {
    'apply-is-array': applyIsArray,
    'declare': declare,
    'convert-typeof-to-is-type': convertTypeofToIsType,
    'remove-useless-conversion': removeUselessConversion,
    'remove-useless-constructor': removeUselessConstructor,
    'remove-double-negations': removeDoubleNegations,
    'remove-useless-typeof': removeUselessTypeof,
};
