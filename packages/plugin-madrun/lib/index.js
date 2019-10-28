'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('add-function'),
    ...getRule('add-fix-lint'),
    ...getRule('add-run'),
    ...getRule('add-madrun-to-lint'),
    ...getRule('call-run'),
    ...getRule('rename-series-to-run'),
    ...getRule('convert-run-argument'),
    ...getRule('convert-lint-lib'),
    ...getRule('rename-predefined-eslint-to-putout'),
    ...getRule('rename-eslint-to-putout'),
    ...getRule('remove-putout'),
};

