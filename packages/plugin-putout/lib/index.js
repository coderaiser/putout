import * as applyTransformWithOptions from './apply-transform-with-options/index.js';
import * as convertPluginsElementToTuple from './convert-plugins-element-to-tuple/index.js';
import * as removeEmptyObjectFromTransform from './remove-empty-object-from-transform/index.js';
import * as applyExports from './apply-exports/index.js';
import * as applyExportsToRenameFiles from './apply-exports-to-rename-files/index.js';
import * as applyExportsToMatchFiles from './apply-exports-to-match-files/index.js';
import * as applyProcessorsDestructuring from './apply-processors-destructuring/index.js';
import * as applyAsyncFormatter from './apply-async-formatter/index.js';
import * as applyCreateTest from './apply-create-test/index.js';
import * as applyRemove from './apply-remove/index.js';
import * as applyInsertBefore from './apply-insert-before/index.js';
import * as applyInsertAfter from './apply-insert-after/index.js';
import * as applyDeclare from './apply-declare/index.js';
import * as checkDeclare from './check-declare/index.js';
import * as checkReplaceCode from './check-replace-code/index.js';
import * as checkMatch from './check-match/index.js';
import * as convertPutoutTestToCreateTest from './convert-putout-test-to-create-test/index.js';
import * as convertToNoTransformCode from './convert-to-no-transform-code/index.js';
import * as convertFindToTraverse from './convert-find-to-traverse/index.js';
import * as convertDestructuringToIdentifier from './convert-destructuring-to-identifier/index.js';
import * as convertNumberToNumeric from './convert-number-to-numeric/index.js';
import * as convertReplaceWith from './convert-replace-with/index.js';
import * as convertReplaceWithMultiple from './convert-replace-with-multiple/index.js';
import * as convertReplaceToFunction from './convert-replace-to-function/index.js';
import * as convertMatchToFunction from './convert-match-to-function/index.js';
import * as convertBabelTypes from './convert-babel-types/index.js';
import * as convertNodeToPathInGetTemplateValues from './convert-node-to-path-in-get-template-values/index.js';
import * as convertTraverseToInclude from './convert-traverse-to-include/index.js';
import * as convertTraverseToReplace from './convert-traverse-to-replace/index.js';
import * as convertTraverseToScan from './convert-traverse-to-scan/index.js';
import * as convertProcessToFind from './convert-process-to-find/index.js';
import * as convertMethodToProperty from './convert-method-to-property/index.js';
import * as convertAddArgumentToAddArgs from './convert-add-argument-to-add-args/index.js';
import * as convertDirnameToUrl from './convert-dirname-to-url/index.js';
import * as convertUrlToDirname from './convert-url-to-dirname/index.js';
import * as convertReportToFunction from './convert-report-to-function/index.js';
import * as replaceTestMessage from './replace-test-message/index.js';
import * as renameOperateToOperator from './rename-operate-to-operator/index.js';
import * as replaceOperateWithOperator from './replace-operate-with-operator/index.js';
import * as shortenImports from './shorten-imports/index.js';
import * as declare from './declare/index.js';
import * as addTestArgs from './add-test-args/index.js';
import * as addTraverseArgs from './add-traverse-args/index.js';
import * as moveRequireOnTopLevel from './move-require-on-top-level/index.js';
import * as includer from './includer/index.js';
import * as createTest from './create-test/index.js';
import * as applyNamespaceSpecifier from './apply-namespace-specifier/index.js';
import * as convertGetRuleToRequire from './convert-get-rule-to-require/index.js';
import * as applyRename from './apply-rename/index.js';
import * as applyShortProcessors from './apply-short-processors/index.js';
import * as addTrackFile from './add-track-file/index.js';
import * as convertProgressToTrackFile from './convert-progress-to-track-file/index.js';
import * as addAwaitToProgress from './add-await-to-progress/index.js';
import * as applyForOfToTrackFile from './apply-for-of-to-track-file/index.js';
import * as removeUnusedGetPropertiesArgument from './remove-unused-get-properties-argument/index.js';
import * as simplifyReplaceTemplate from './simplify-replace-template/index.js';
import * as removeEmptyArrayFromProcess from './remove-empty-array-from-process/index.js';
import * as addPlacesToComparePlaces from './add-places-to-compare-places/index.js';
import * as addPathArgToFix from './add-path-arg-to-fix/index.js';
import * as convertIncludeToTraverse from './convert-include-to-traverse/index.js';
import * as removeUselessPrinterOption from './remove-useless-printer-option/index.js';
import * as addPathArgToVisitors from './add-path-arg-to-visitors/index.js';
import * as applyFixtureNameToMessage from './apply-fixture-name-to-message/index.js';
import * as applyVars from './apply-vars/index.js';
import * as declareTemplateVariables from './declare-template-variables/index.js';
import * as declarePathVariable from './declare-path-variable/index.js';
import * as applyParens from './apply-parens/index.js';
import * as applyLowercaseToNodeBuilders from './apply-lowercase-to-node-builders/index.js';
import * as applyCreateNestedDirectory from './apply-create-nested-directory/index.js';
import * as applyReport from './apply-report/index.js';
import * as applyExportsToAddArgs from './apply-exports-to-add-args/index.js';

export const rules = {
    'apply-processors-destructuring': applyProcessorsDestructuring,
    'apply-async-formatter': applyAsyncFormatter,
    'apply-create-test': applyCreateTest,
    'apply-remove': applyRemove,
    'apply-insert-before': applyInsertBefore,
    'apply-insert-after': applyInsertAfter,
    'apply-declare': applyDeclare,
    'apply-exports-to-add-args': applyExportsToAddArgs,
    'check-declare': checkDeclare,
    'check-replace-code': checkReplaceCode,
    'check-match': checkMatch,
    'convert-putout-test-to-create-test': convertPutoutTestToCreateTest,
    'convert-to-no-transform-code': convertToNoTransformCode,
    'convert-find-to-traverse': convertFindToTraverse,
    'convert-destructuring-to-identifier': convertDestructuringToIdentifier,
    'convert-number-to-numeric': convertNumberToNumeric,
    'convert-replace-with': convertReplaceWith,
    'convert-replace-with-multiple': convertReplaceWithMultiple,
    'convert-replace-to-function': convertReplaceToFunction,
    'convert-match-to-function': convertMatchToFunction,
    'convert-babel-types': convertBabelTypes,
    'convert-node-to-path-in-get-template-values': convertNodeToPathInGetTemplateValues,
    'convert-traverse-to-include': convertTraverseToInclude,
    'convert-traverse-to-replace': convertTraverseToReplace,
    'convert-process-to-find': convertProcessToFind,
    'convert-method-to-property': convertMethodToProperty,
    'convert-add-argument-to-add-args': convertAddArgumentToAddArgs,
    'convert-dirname-to-url': convertDirnameToUrl,
    'convert-url-to-dirname': convertUrlToDirname,
    'convert-report-to-function': convertReportToFunction,
    'replace-test-message': replaceTestMessage,
    'rename-operate-to-operator': renameOperateToOperator,
    'replace-operate-with-operator': replaceOperateWithOperator,
    'shorten-imports': shortenImports,
    declare,
    'add-test-args': addTestArgs,
    'add-traverse-args': addTraverseArgs,
    'move-require-on-top-level': moveRequireOnTopLevel,
    includer,
    'create-test': createTest,
    'apply-namespace-specifier': applyNamespaceSpecifier,
    'convert-get-rule-to-require': convertGetRuleToRequire,
    'apply-rename': applyRename,
    'apply-short-processors': applyShortProcessors,
    'convert-traverse-to-scan': convertTraverseToScan,
    'add-track-file': addTrackFile,
    'convert-progress-to-track-file': convertProgressToTrackFile,
    'add-await-to-progress': addAwaitToProgress,
    'apply-for-of-to-track-file': applyForOfToTrackFile,
    'remove-unused-get-properties-argument': removeUnusedGetPropertiesArgument,
    'simplify-replace-template': simplifyReplaceTemplate,
    'remove-empty-array-from-process': removeEmptyArrayFromProcess,
    'add-places-to-compare-places': addPlacesToComparePlaces,
    'add-path-arg-to-fix': addPathArgToFix,
    'convert-include-to-traverse': convertIncludeToTraverse,
    'remove-useless-printer-option': removeUselessPrinterOption,
    'add-path-arg-to-visitors': addPathArgToVisitors,
    'apply-fixture-name-to-message': applyFixtureNameToMessage,
    'apply-vars': applyVars,
    'declare-template-variables': declareTemplateVariables,
    'declare-path-variable': declarePathVariable,
    'apply-parens': applyParens,
    'apply-lowercase-to-node-builders': applyLowercaseToNodeBuilders,
    'apply-create-nested-directory': applyCreateNestedDirectory,
    'apply-report': applyReport,
    'apply-exports-to-match-files': applyExportsToMatchFiles,
    'apply-exports-to-rename-files': applyExportsToRenameFiles,
    'apply-exports': ['off', applyExports],
    'remove-empty-object-from-transform': removeEmptyObjectFromTransform,
    'convert-plugins-element-to-tuple': convertPluginsElementToTuple,
    'apply-transform-with-options': applyTransformWithOptions,
};
