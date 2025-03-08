'use strict';

const convertRcToFlat = require('./convert-rc-to-flat/index.js');
const declare = require('./declare/index.js');
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
const removeUselessSlice = require('./remove-useless-slice');
const convertFilesToArray = require('./convert-files-to-array');
const applyMatchToFlat = require('./apply-match-to-flat');
const applyDirToFlat = require('./apply-dir-to-flat');
const convertExportMatchToDeclaration = require('./convert-export-match-to-declaration');
const convertPluginsArrayToObject = require('./convert-plugins-array-to-object');
const removeUselessProperties = require('./remove-useless-properties');
const applyIgnores = require('./apply-ignores');
const applyCreateEslintConfig = require('./apply-create-eslint-config');
const removeParserOptions = require('./remove-parser-options');
const removeSpreadFromCreateEslintConfig = require('./remove-spread-from-create-eslint-config');
const removeSuffixConfig = require('./remove-suffix-config');
const removeCreateEslintConfigWithOneArgument = require('./remove-create-eslint-config-with-one-argument');
const removeUselessMatchToFlat = require('./remove-useless-match-to-flat');
const applyDefineConfig = require('./apply-define-config');

module.exports.rules = {
    'add-putout': addPutout,
    'apply-safe-align': applySafeAlign,
    'convert-ide-to-safe': convertIdeToSafe,
    'convert-require-to-import': convertRequireToImport,
    'convert-node-to-n': convertNodeToN,
    'convert-rc-to-flat': ['off', convertRcToFlat],
    declare,
    'move-putout-to-end-of-extends': movePutoutToEndOfExtends,
    'remove-no-unpublished-require': removeNoUnpublishedRequire,
    'remove-no-unsupported-features': removeNoUnsupportedFeatures,
    'remove-overrides-with-empty-rules': removeOverridesWithEmptyRules,
    'remove-no-missing': removeNoMissing,
    'remove-useless-slice': removeUselessSlice,
    'convert-files-to-array': convertFilesToArray,
    'apply-match-to-flat': applyMatchToFlat,
    'apply-dir-to-flat': applyDirToFlat,
    'convert-export-match-to-declaration': convertExportMatchToDeclaration,
    'convert-plugins-array-to-object': convertPluginsArrayToObject,
    'remove-useless-properties': removeUselessProperties,
    'apply-ignores': ['off', applyIgnores],
    'apply-create-eslint-config': applyCreateEslintConfig,
    'remove-parser-options': removeParserOptions,
    'remove-spread-from-create-eslint-config': removeSpreadFromCreateEslintConfig,
    'remove-suffix-config': removeSuffixConfig,
    'remove-create-eslint-config-with-one-argument': removeCreateEslintConfigWithOneArgument,
    'remove-useless-match-to-flat': removeUselessMatchToFlat,
    'apply-define-config': applyDefineConfig,
};
