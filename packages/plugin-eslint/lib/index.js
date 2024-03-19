'use strict';

const convertRcToFlat = require('./convert-rc-to-flat/index.js');
const removeNoMissing = require('./remove-no-missing/index.js');
const removeOverridesWithEmptyRules = require('./remove-overrides-with-empty-rules/index.js');
const removeNoUnsupportedFeatures = require('./remove-no-unsupported-features/index.js');
const removeNoUnpublishedRequire = require('./remove-no-unpublished-require/index.js');
const convertNodeToN = require('./convert-node-to-n/index.js');
const convertRequireToImport = require('./convert-require-to-import/index.js');
const convertIdeToSafe = require('./convert-ide-to-safe/index.js');
const movePutoutToEndOfExtends = require('./move-putout-to-end-of-extends/index.js');
const applySafeAlign = require('./apply-safe-align/index.js');
const addPutout = require('./add-putout/index.js');

module.exports.rules = {
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
