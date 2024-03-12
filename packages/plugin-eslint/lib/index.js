import * as addPutout from './add-putout/index.js';
import * as applySafeAlign from './apply-safe-align/index.js';
import * as movePutoutToEndOfExtends from './move-putout-to-end-of-extends/index.js';
import * as convertIdeToSafe from './convert-ide-to-safe/index.js';
import * as convertRequireToImport from './convert-require-to-import/index.js';
import * as convertNodeToN from './convert-node-to-n/index.js';
import * as removeNoUnpublishedRequire from './remove-no-unpublished-require/index.js';
import * as removeNoUnsupportedFeatures from './remove-no-unsupported-features/index.js';
import * as removeOverridesWithEmptyRules from './remove-overrides-with-empty-rules/index.js';
import * as removeNoMissing from './remove-no-missing/index.js';
import convertRcToFlat from './convert-rc-to-flat/index.js';

export const rules = {
    'add-putout': addPutout,
    'apply-safe-align': applySafeAlign,
    'move-putout-to-end-of-extends': movePutoutToEndOfExtends,
    'convert-ide-to-safe': convertIdeToSafe,
    'convert-require-to-import': convertRequireToImport,
    'convert-node-to-n': convertNodeToN,
    'remove-no-unpublished-require': removeNoUnpublishedRequire,
    'remove-no-unsupported-features': removeNoUnsupportedFeatures,
    'remove-overrides-with-empty-rules': removeOverridesWithEmptyRules,
    'remove-no-missing': removeNoMissing,
    'convert-rc-to-flat': ['off', convertRcToFlat],
};
