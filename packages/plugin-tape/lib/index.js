'use strict';

const applyStub = require('./apply-stub');
const applyDestructuring = require('./apply-destructuring');
const applyWithName = require('./apply-with-name');
const addAwaitToReImport = require('./add-await-to-re-import');
const jest = require('./jest');
const syncWithName = require('./sync-with-name');
const convertTapeToSupertape = require('./convert-tape-to-supertape');
const convertThrowsToTryCatch = require('./convert-throws-to-try-catch');
const convertDoesNotThrowToTryCatch = require('./convert-does-not-throw-to-try-catch');
const convertCalledWithToCalledWithNoArgs = require('./convert-called-with-to-called-with-no-args');
const convertCalledWithArgs = require('./convert-called-with-args');
const convertCalledWithNoArgsToCalledWith = require('./convert-called-with-no-args-to-called-with');
const convertEmitterToPromise = require('./convert-emitter-to-promise');
const convertOkToMatch = require('./convert-ok-to-match');
const convertOkToCalledWith = require('./convert-ok-to-called-with');
const convertMatchRegexpToString = require('./convert-match-regexp-to-string');
const convertEqualToNotOk = require('./convert-equal-to-not-ok');
const convertEqualToDeepEqual = require('./convert-equal-to-deep-equal');
const convertEqualToOk = require('./convert-equal-to-ok');
const convertEqualToCalledOnce = require('./convert-equal-to-called-once');
const convertDeepEqualToEqual = require('./convert-deep-equal-to-equal');
const convertMockRequireToMockImport = require('./convert-mock-require-to-mock-import');
const addArgs = require('./add-args');
const declare = require('./declare');
const removeDefaultMessages = require('./remove-default-messages');
const removeUselessNotCalledArgs = require('./remove-useless-not-called-args');
const switchExpectedWithResult = require('./switch-expected-with-result');
const addTEnd = require('./add-t-end');
const addStopAll = require('./add-stop-all');
const removeStopAll = require('./remove-stop-all');
const removeUselessTEnd = require('./remove-useless-t-end');
const removeOnly = require('./remove-only');
const removeSkip = require('./remove-skip');
const convertEqualsToEqual = require('./convert-equals-to-equal');
const addNodePrefixToMockRequire = require('./add-node-prefix-to-mock-require');

module.exports.rules = {
    'convert-mock-require-to-mock-import': ['off', convertMockRequireToMockImport],
    
    'apply-stub': applyStub,
    'apply-destructuring': applyDestructuring,
    'apply-with-name': applyWithName,
    'add-await-to-re-import': addAwaitToReImport,
    jest,
    'sync-with-name': syncWithName,
    'convert-tape-to-supertape': convertTapeToSupertape,
    'convert-throws-to-try-catch': convertThrowsToTryCatch,
    'convert-does-not-throw-to-try-catch': convertDoesNotThrowToTryCatch,
    'convert-called-with-to-called-with-no-args': convertCalledWithToCalledWithNoArgs,
    'convert-called-with-args': convertCalledWithArgs,
    'convert-called-with-no-args-to-called-with': convertCalledWithNoArgsToCalledWith,
    'convert-emitter-to-promise': convertEmitterToPromise,
    'convert-ok-to-match': convertOkToMatch,
    'convert-ok-to-called-with': convertOkToCalledWith,
    'convert-match-regexp-to-string': convertMatchRegexpToString,
    'convert-equal-to-not-ok': convertEqualToNotOk,
    'convert-equal-to-deep-equal': convertEqualToDeepEqual,
    'convert-equal-to-ok': convertEqualToOk,
    'convert-equal-to-called-once': convertEqualToCalledOnce,
    'convert-equals-to-equal': convertEqualsToEqual,
    'convert-deep-equal-to-equal': convertDeepEqualToEqual,
    'add-args': addArgs,
    declare,
    'remove-default-messages': removeDefaultMessages,
    'remove-useless-not-called-args': removeUselessNotCalledArgs,
    'switch-expected-with-result': switchExpectedWithResult,
    'add-t-end': addTEnd,
    'add-stop-all': addStopAll,
    'remove-stop-all': removeStopAll,
    'remove-useless-t-end': removeUselessTEnd,
    'remove-only': removeOnly,
    'remove-skip': removeSkip,
    'add-node-prefix-to-mock-require': addNodePrefixToMockRequire,
};
