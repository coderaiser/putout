'use strict';

const removeUselessAsync = require('@putout/plugin-remove-useless-async');
const removeUselessAwait = require('@putout/plugin-remove-useless-await');

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('remove-useless-resolve'),
    ...getRule('convert-reject-to-throw'),
    ...getRule('add-missing-await'),
    ...getRule('apply-top-level-await'),
    'remove-useless-async': removeUselessAsync,
    'remove-useless-await': removeUselessAwait,
};

