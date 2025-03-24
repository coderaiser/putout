import * as addFunction from './add-function/index.js';
import * as addFixLint from './add-fix-lint/index.js';
import * as addRun from './add-run/index.js';
import * as addCutEnv from './add-cut-env/index.js';
import * as callRun from './call-run/index.js';
import * as renameSeriesToRun from './rename-series-to-run/index.js';
import * as convertRunArgument from './convert-run-argument/index.js';
import * as convertLintLib from './convert-lint-lib/index.js';
import * as renameEslintToPutout from './rename-eslint-to-putout/index.js';
import * as removePutout from './remove-putout/index.js';
import * as setLintDot from './set-lint-dot/index.js';
import * as convertToAsync from './convert-to-async/index.js';
import * as convertNycToC8 from './convert-nyc-to-c8/index.js';
import * as convertRunToCutEnv from './convert-run-to-cut-env/index.js';
import * as convertCutEnvToRun from './convert-cut-env-to-run/index.js';
import * as setReportLcov from './set-report-lcov/index.js';
import * as removeCheckDuplicatesFromTest from './remove-check-duplicates-from-test/index.js';
import * as declare from './declare/index.js';
import * as convertArgsToScripts from './convert-args-to-scripts/index.js';
import * as removeUselessArrayInRun from './remove-useless-array-in-run/index.js';
import * as removeUselessStringConversion from './remove-useless-string-conversion/index.js';
import * as addMissingQuotesToWatcher from './add-missing-quotes-to-watcher/index.js';

export const rules = {
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
