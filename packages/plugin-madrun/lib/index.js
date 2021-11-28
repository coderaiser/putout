'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('add-function'),
    ...getRule('add-fix-lint'),
    ...getRule('add-run'),
    ...getRule('call-run'),
    ...getRule('rename-series-to-run'),
    ...getRule('convert-run-argument'),
    ...getRule('convert-lint-lib'),
    ...getRule('rename-eslint-to-putout'),
    ...getRule('remove-putout'),
    ...getRule('set-lint-dot'),
    ...getRule('convert-to-async'),
    ...getRule('convert-nyc-to-c8'),
    ...getRule('set-report-lcov'),
    ...getRule('remove-check-duplicates-from-test'),
    ...getRule('declare'),
};

