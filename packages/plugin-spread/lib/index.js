import * as removeUselessArray from './remove-useless-array/index.js';
import * as removeUselessObject from './remove-useless-object/index.js';
import * as simplifyNested from './simplify-nested/index.js';

export const rules = {
    'remove-useless-array': removeUselessArray,
    'remove-useless-object': removeUselessObject,
    'simplify-nested': simplifyNested,
};
