import * as convertRcToFlat from './convert-rc-to-flat/index.js';
import * as declare from './declare/index.js';
import * as removeNoMissing from './remove-no-missing/index.js';
import * as removeOverridesWithEmptyRules from './remove-overrides-with-empty-rules/index.js';
import * as removeNoUnsupportedFeatures from './remove-no-unsupported-features/index.js';
import * as removeNoUnpublishedRequire from './remove-no-unpublished-require/index.js';
import * as convertNodeToN from './convert-node-to-n/index.js';
import * as convertRequireToImport from './convert-require-to-import/index.js';
import * as convertIdeToSafe from './convert-ide-to-safe/index.js';
import * as movePutoutToEndOfExtends from './move-putout-to-end-of-extends/index.js';
import * as applySafeAlign from './apply-safe-align/index.js';
import * as addPutout from './add-putout/index.js';
import * as removeUselessSlice from './remove-useless-slice/index.js';
import * as convertFilesToArray from './convert-files-to-array/index.js';
import * as applyMatchToFlat from './apply-match-to-flat/index.js';
import * as applyDirToFlat from './apply-dir-to-flat/index.js';
import * as convertExportMatchToDeclaration from './convert-export-match-to-declaration/index.js';
import * as convertPluginsArrayToObject from './convert-plugins-array-to-object/index.js';
import * as removeUselessProperties from './remove-useless-properties/index.js';
import * as applyIgnores from './apply-ignores/index.js';
import * as applyCreateEslintConfig from './apply-create-eslint-config/index.js';
import * as removeParserOptions from './remove-parser-options/index.js';
import * as removeSpreadFromCreateEslintConfig from './remove-spread-from-create-eslint-config/index.js';
import * as removeSuffixConfig from './remove-suffix-config/index.js';
import * as removeCreateEslintConfigWithOneArgument from './remove-create-eslint-config-with-one-argument/index.js';
import * as removeUselessMatchToFlat from './remove-useless-match-to-flat/index.js';
import * as applyDefineConfig from './apply-define-config/index.js';

export const rules = {
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
