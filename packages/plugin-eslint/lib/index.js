'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('add-putout'),
    ...getRule('apply-safe-align'),
    ...getRule('move-putout-to-end-of-extends'),
    ...getRule('convert-ide-to-safe'),
    ...getRule('convert-require-to-import'),
    ...getRule('remove-no-unpublished-require'),
    ...getRule('remove-no-unsupported-features'),
    ...getRule('remove-overrides-with-empty-rules'),
    ...getRule('remove-no-missing'),
};

