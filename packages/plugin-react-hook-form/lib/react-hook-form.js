'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('apply-clear-errors'),
    ...getRule('convert-as-to-render'),
    ...getRule('convert-form-context-to-form-provider'),
    ...getRule('convert-trigger-validation-to-trigger'),
    ...getRule('remove-value-from-control'),
};

