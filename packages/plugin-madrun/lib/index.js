'use strict';

const addFunction = require('./add-function');
const addFixLint = require('./add-fix-lint');
const addRun = require('./add-run');
const addCutEnv = require('./add-cut-env');
const callRun = require('./call-run');
const renameSeriesToRun = require('./rename-series-to-run');
const convertRunArgument = require('./convert-run-argument');
const convertLintLib = require('./convert-lint-lib');
const renameEslintToPutout = require('./rename-eslint-to-putout');
const removePutout = require('./remove-putout');
const setLintDot = require('./set-lint-dot');
const convertToAsync = require('./convert-to-async');
const convertNycToC8 = require('./convert-nyc-to-c8');
const convertRunToCutEnv = require('./convert-run-to-cut-env');
const convertCutEnvToRun = require('./convert-cut-env-to-run');
const setReportLcov = require('./set-report-lcov');
const removeCheckDuplicatesFromTest = require('./remove-check-duplicates-from-test');
const declare = require('./declare');
const convertArgsToScripts = require('./convert-args-to-scripts');
const removeUselessArrayInRun = require('./remove-useless-array-in-run');
const removeUselessStringConversion = require('./remove-useless-string-conversion');
const addMissingQuotesToWatcher = require('./add-missing-quotes-to-watcher');

module.exports.rules = {
    'add-function': addFunction,
    'add-fix-lint': addFixLint,
    'add-run': addRun,
    'add-cut-env': addCutEnv,
    'call-run': callRun,
    'rename-series-to-run': renameSeriesToRun,
    'convert-run-argument': convertRunArgument,
    'convert-lint-lib': convertLintLib,
    'rename-eslint-to-putout': renameEslintToPutout,
    'remove-putout': removePutout,
    'set-lint-dot': setLintDot,
    'convert-to-async': convertToAsync,
    'convert-nyc-to-c8': convertNycToC8,
    'convert-run-to-cut-env': convertRunToCutEnv,
    'convert-cut-env-to-run': convertCutEnvToRun,
    'set-report-lcov': setReportLcov,
    'remove-check-duplicates-from-test': removeCheckDuplicatesFromTest,
    declare,
    'convert-args-to-scripts': convertArgsToScripts,
    'remove-useless-array-in-run': removeUselessArrayInRun,
    'remove-useless-string-conversion': removeUselessStringConversion,
    'add-missing-quotes-to-watcher': addMissingQuotesToWatcher,
};
