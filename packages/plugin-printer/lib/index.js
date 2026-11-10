import * as declareNearby from './declare-nearby/index.js';
import * as applyPrinterDeclarations from './apply-printer-declarations/index.js';
import * as removeUselessPrint from './remove-useless-print/index.js';
import * as removeUselessMaybe from './remove-useless-maybe/index.js';
import * as applyCreateTestUrl from './apply-create-test-url/index.js';
import * as removeArgs from './remove-args/index.js';
import * as applyBreakline from './apply-breakline/index.js';
import * as applyLinebreak from './apply-linebreak/index.js';
import * as applyComputedPrint from './apply-computed-print/index.js';
import * as addArgs from './add-args/index.js';
import * as declare from './declare/index.js';
import * as applyTypes from './apply-types/index.js';
import * as removeLegacyTestDeclaration from './remove-legacy-test-declaration/index.js';

export const rules = {
    'add-args': addArgs,
    'apply-printer-declarations': applyPrinterDeclarations,
    'apply-breakline': applyBreakline,
    'apply-linebreak': applyLinebreak,
    'apply-computed-print': applyComputedPrint,
    'apply-types': applyTypes,
    'apply-create-test-url': applyCreateTestUrl,
    declare,
    'remove-legacy-test-declaration': removeLegacyTestDeclaration,
    'remove-args': removeArgs,
    'remove-useless-maybe': removeUselessMaybe,
    'remove-useless-print': removeUselessPrint,
    'declare-nearby': declareNearby,
};
