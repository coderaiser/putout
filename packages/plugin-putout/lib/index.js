'use strict';

const applyProcessorsDestructuring = require('./apply-processors-destructuring');
const applyAsyncFormatter = require('./apply-async-formatter');
const applyCreateTest = require('./apply-create-test');
const applyRemove = require('./apply-remove');
const applyInsertBefore = require('./apply-insert-before');
const applyInsertAfter = require('./apply-insert-after');
const applyDeclare = require('./apply-declare');
const checkDeclare = require('./check-declare');
const checkReplaceCode = require('./check-replace-code');
const checkMatch = require('./check-match');
const convertPutoutTestToCreateTest = require('./convert-putout-test-to-create-test');
const convertToNoTransformCode = require('./convert-to-no-transform-code');
const convertFindToTraverse = require('./convert-find-to-traverse');
const convertDestructuringToIdentifier = require('./convert-destructuring-to-identifier');
const convertNumberToNumeric = require('./convert-number-to-numeric');
const convertReplaceWith = require('./convert-replace-with');
const convertReplaceWithMultiple = require('./convert-replace-with-multiple');
const convertReplaceToFunction = require('./convert-replace-to-function');
const convertMatchToFunction = require('./convert-match-to-function');
const convertBabelTypes = require('./convert-babel-types');
const convertNodeToPathInGetTemplateValues = require('./convert-node-to-path-in-get-template-values');
const convertTraverseToInclude = require('./convert-traverse-to-include');
const convertTraverseToReplace = require('./convert-traverse-to-replace');
const convertTraverseToScan = require('./convert-traverse-to-scan');
const convertProcessToFind = require('./convert-process-to-find');
const convertMethodToProperty = require('./convert-method-to-property');
const convertAddArgumentToAddArgs = require('./convert-add-argument-to-add-args');
const convertDirnameToUrl = require('./convert-dirname-to-url');
const convertUrlToDirname = require('./convert-url-to-dirname');
const convertReportToFunction = require('./convert-report-to-function');
const replaceTestMessage = require('./replace-test-message');
const renameOperateToOperator = require('./rename-operate-to-operator');
const replaceOperateWithOperator = require('./replace-operate-with-operator');
const shortenImports = require('./shorten-imports');
const declare = require('./declare');
const addTestArgs = require('./add-test-args');
const addTraverseArgs = require('./add-traverse-args');
const moveRequireOnTopLevel = require('./move-require-on-top-level');
const includer = require('./includer');
const createTest = require('./create-test');
const applyNamespaceSpecifier = require('./apply-namespace-specifier');
const convertGetRuleToRequire = require('./convert-get-rule-to-require');
const addIndexToImport = require('./add-index-to-import');
const applyRename = require('./apply-rename');
const applyShortProcessors = require('./apply-short-processors');
const addTrackFile = require('./add-track-file');
const convertProgressToTrackFile = require('./convert-progress-to-track-file');
const addAwaitToProgress = require('./add-await-to-progress');
const applyForOfToTrackFile = require('./apply-for-of-to-track-file');
const removeUnusedGetPropertiesArgument = require('./remove-unused-get-properties-argument');
const simplifyReplaceTemplate = require('./simplify-replace-template');
const removeEmptyArrayFromProcess = require('./remove-empty-array-from-process');
const addPlacesToComparePlaces = require('./add-places-to-compare-places');
const addPathArgToFix = require('./add-path-arg-to-fix');
const convertIncludeToTraverse = require('./convert-include-to-traverse');
const removeUselessPrinterOption = require('./remove-useless-printer-option');
const addPathArgToVisitors = require('./add-path-arg-to-visitors');
const applyFixtureNameToMessage = require('./apply-fixture-name-to-message');
const applyVars = require('./apply-vars');
const declareTemplateVariables = require('./declare-template-variables');
const declarePathVariable = require('./declare-path-variable');
const applyParens = require('./apply-parens');
const applyLowercaseToNodeBuilders = require('./apply-lowercase-to-node-builders');
const applyCreateNestedDirectory = require('./apply-create-nested-directory');
const applyReport = require('./apply-report');

module.exports.rules = {
    'apply-processors-destructuring': applyProcessorsDestructuring,
    'apply-async-formatter': applyAsyncFormatter,
    'apply-create-test': applyCreateTest,
    'apply-remove': applyRemove,
    'apply-insert-before': applyInsertBefore,
    'apply-insert-after': applyInsertAfter,
    'apply-declare': applyDeclare,
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
    'add-index-to-import': addIndexToImport,
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
};
