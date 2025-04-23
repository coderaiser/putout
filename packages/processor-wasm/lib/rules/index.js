import * as convertGetLocalToLocalGet from './convert-get-local-to-local-get/index.js';
import * as convertSetLocalToLocalSet from './convert-set-local-to-local-set/index.js';
import * as applyNesting from './apply-nesting/index.js';
import * as removeUselessArgs from './remove-useless-args/index.js';
import * as removeUnused from './remove-unused/index.js';

export const rules = [
    ['convert-get-local-to-local-get', convertGetLocalToLocalGet],
    ['convert-set-local-to-local-set', convertSetLocalToLocalSet],
    ['apply-nesting', applyNesting],
    ['remove-useless-args', removeUselessArgs],
    ['remove-unused', removeUnused],
];
