import * as removeUnused from './remove-unused/index.js';
import * as convertSetLocalToLocalSet from './convert-set-local-to-local-set/index.js';
import * as convertGetLocalToLocalGet from './convert-get-local-to-local-get/index.js';
import * as applyNesting from './apply-nesting/index.js';

export const rules = {
    'apply-nesting': applyNesting,
    'convert-get-local-to-local-get': convertGetLocalToLocalGet,
    'convert-set-local-to-local-set': convertSetLocalToLocalSet,
    'remove-unused': removeUnused,
};
