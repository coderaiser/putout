'use strict';

const removeUselessAwait = require('@putout/plugin-remove-useless-await');

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('remove-useless-resolve'),
    ...getRule('convert-reject-to-throw'),
    ...getRule('add-missing-await'),
    ...getRule('apply-top-level-await'),
    ...getRule('remove-useless-async'),
    'remove-useless-await': removeUselessAwait,
};

