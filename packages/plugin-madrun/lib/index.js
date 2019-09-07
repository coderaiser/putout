'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('add-function'),
    ...getRule('add-fix-lint'),
    ...getRule('add-madrun-to-lint'),
    ...getRule('call-run'),
    ...getRule('rename-series-to-run'),
    ...getRule('convert-run-argument'),
    ...getRule('convert-lint-lib'),
    ...getRule('rename-eslint-to-putout'),
};

