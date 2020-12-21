'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('switch-expected-with-result'),
    ...getRule('convert-tape-to-supertape'),
    ...getRule('convert-throws-to-try-catch'),
    ...getRule('convert-called-with-to-called-with-no-args'),
    ...getRule('expand-try-catch-arguments'),
    ...getRule('apply-stub-operator'),
};

