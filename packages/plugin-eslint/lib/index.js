'use strict';

const addPutout = require('./add-putout');
const applySafeAlign = require('./apply-safe-align');
const movePutoutToEndOfExtends = require('./move-putout-to-end-of-extends');
const convertIdeToSafe = require('./convert-ide-to-safe');
const convertRequireToImport = require('./convert-require-to-import');
const convertNodeToN = require('./convert-node-to-n');
const removeNoUnpublishedRequire = require('./remove-no-unpublished-require');
const removeNoUnsupportedFeatures = require('./remove-no-unsupported-features');
const removeOverridesWithEmptyRules = require('./remove-overrides-with-empty-rules');
const removeNoMissing = require('./remove-no-missing');
const convertRcToFlat = require('./convert-rc-to-flat');

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
