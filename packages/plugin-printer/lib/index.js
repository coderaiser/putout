import * as removeArgs from './remove-args/index.js';
import * as applyBreakline from './apply-breakline/index.js';
import * as applyLinebreak from './apply-linebreak/index.js';
import * as applyComputedPrint from './apply-computed-print/index.js';
import * as addArgs from './add-args/index.js';
import * as declare from './declare/index.js';
import * as applyTypes from './apply-types/index.js';
import * as removeLegacyTestDeclaration from './remove-legacy-test-declaration/index.js';

export const rules = {
    'remove-args': removeArgs,
    'apply-breakline': applyBreakline,
    'apply-linebreak': applyLinebreak,
    'apply-computed-print': applyComputedPrint,
    'add-args': addArgs,
    declare,
    'apply-types': applyTypes,
    'remove-legacy-test-declaration': removeLegacyTestDeclaration,
};
