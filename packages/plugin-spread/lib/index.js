import * as convertObjectAssignToMergeSpread from './convert-object-assign-to-merge-spread/index.js';
import * as convertApplyToSpread from './convert-apply-to-spread/index.js';
import * as removeUselessArray from './remove-useless-array/index.js';
import * as removeUselessObject from './remove-useless-object/index.js';
import * as simplifyNested from './simplify-nested/index.js';

export const rules = {
    'convert-apply-to-spread': convertApplyToSpread,
    'convert-object-assign-to-merge-spread': convertObjectAssignToMergeSpread,
    'remove-useless-array': removeUselessArray,
    'remove-useless-object': removeUselessObject,
    'simplify-nested': simplifyNested,
};
