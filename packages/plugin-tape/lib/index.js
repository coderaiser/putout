'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('switch-expected-with-result'),
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
    ...getRule('convert-equal-to-ok'),
    ...getRule('expand-try-catch-arguments'),
    ...getRule('apply-stub-operator'),
    ...getRule('declare-stub'),
};

