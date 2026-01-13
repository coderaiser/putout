import * as applyStub from './apply-stub/index.js';
import * as applyDestructuring from './apply-destructuring/index.js';
import * as applyWithName from './apply-with-name/index.js';
import * as jest from './jest/index.js';
import * as syncWithName from './sync-with-name/index.js';
import * as convertTapeToSupertape from './convert-tape-to-supertape/index.js';
import * as convertThrowsToTryCatch from './convert-throws-to-try-catch/index.js';
import * as convertDoesNotThrowToTryCatch from './convert-does-not-throw-to-try-catch/index.js';
import * as convertCalledWithToCalledWithNoArgs from './convert-called-with-to-called-with-no-args/index.js';
import * as convertCalledWithArgs from './convert-called-with-args/index.js';
import * as convertCalledWithNoArgsToCalledWith from './convert-called-with-no-args-to-called-with/index.js';
import * as convertEmitterToPromise from './convert-emitter-to-promise/index.js';
import * as convertOkToMatch from './convert-ok-to-match/index.js';
import * as convertOkToCalledWith from './convert-ok-to-called-with/index.js';
import * as convertMatchRegexpToString from './convert-match-regexp-to-string/index.js';
import * as convertEqualToNotOk from './convert-equal-to-not-ok/index.js';
import * as convertEqualToDeepEqual from './convert-equal-to-deep-equal/index.js';
import * as convertEqualToOk from './convert-equal-to-ok/index.js';
import * as convertEqualToCalledOnce from './convert-equal-to-called-once/index.js';
import * as convertDeepEqualToEqual from './convert-deep-equal-to-equal/index.js';
import * as addArgs from './add-args/index.js';
import * as declare from './declare/index.js';
import * as removeDefaultMessages from './remove-default-messages/index.js';
import * as removeUselessNotCalledArgs from './remove-useless-not-called-args/index.js';
import * as switchExpectedWithResult from './switch-expected-with-result/index.js';
import * as addTEnd from './add-t-end/index.js';
import * as addStopAll from './add-stop-all/index.js';
import * as removeUselessTEnd from './remove-useless-t-end/index.js';
import * as removeOnly from './remove-only/index.js';
import * as removeSkip from './remove-skip/index.js';
import * as convertEqualsToEqual from './convert-equals-to-equal/index.js';

export const rules = {
    'apply-stub': applyStub,
    'apply-destructuring': applyDestructuring,
    'apply-with-name': applyWithName,
    'jest': jest,
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
    'declare': declare,
    'remove-default-messages': removeDefaultMessages,
    'remove-useless-not-called-args': removeUselessNotCalledArgs,
    'switch-expected-with-result': switchExpectedWithResult,
    'add-t-end': addTEnd,
    'add-stop-all': addStopAll,
    'remove-useless-t-end': removeUselessTEnd,
    'remove-only': removeOnly,
    'remove-skip': removeSkip,
};
