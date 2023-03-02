'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('apply-stub'),
    ...getRule('apply-destructuring'),
    ...getRule('apply-with-name'),
    ...getRule('add-await-to-re-import'),
    ...getRule('jest'),
    ...getRule('sync-with-name'),
    ...getRule('convert-tape-to-supertape'),
    ...getRule('convert-throws-to-try-catch'),
    ...getRule('convert-does-not-throw-to-try-catch'),
    ...getRule('convert-called-with-to-called-with-no-args'),
    ...getRule('convert-called-with-args'),
    ...getRule('convert-called-with-no-args-to-called-with'),
    ...getRule('convert-emitter-to-promise'),
    ...getRule('convert-ok-to-match'),
    ...getRule('convert-ok-to-called-with'),
    ...getRule('convert-match-regexp-to-string'),
    ...getRule('convert-equal-to-not-ok'),
    ...getRule('convert-equal-to-deep-equal'),
    ...getRule('convert-equal-to-ok'),
    ...getRule('convert-equal-to-called-once'),
    ...getRule('convert-deep-equal-to-equal'),
    ...getRule('add-args'),
    ...getRule('declare'),
    ...getRule('remove-default-messages'),
    ...getRule('remove-useless-not-called-args'),
    ...getRule('switch-expected-with-result'),
    ...getRule('apply-stub-operator'),
    ...getRule('add-t-end'),
    ...getRule('add-stop-all'),
    ...getRule('remove-stop-all'),
    ...getRule('remove-useless-t-end'),
    ...getRule('remove-only'),
    ...getRule('remove-skip'),
};

