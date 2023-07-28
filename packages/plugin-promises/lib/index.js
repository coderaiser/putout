'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('remove-useless-resolve'),
    ...getRule('convert-reject-to-throw'),
    ...getRule('convert-new-promise-to-async'),
    ...getRule('add-missing-await'),
    ...getRule('apply-await-import'),
    ...getRule('apply-top-level-await'),
    ...getRule('remove-useless-async'),
    ...getRule('remove-useless-await'),
    ...getRule('remove-useless-variables'),
};
