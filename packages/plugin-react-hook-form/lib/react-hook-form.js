'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('v7-apply-form-state'),
    ...getRule('v6-apply-clear-errors'),
    ...getRule('v6-convert-as-to-render'),
    ...getRule('v6-convert-form-context-to-form-provider'),
    ...getRule('v6-convert-trigger-validation-to-trigger'),
    ...getRule('v5-remove-value-from-control'),
};

