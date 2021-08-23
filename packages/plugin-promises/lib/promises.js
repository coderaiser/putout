'use strict';

const removeUselessAsync = require('@putout/plugin-remove-useless-async');

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('remove-useless-resolve'),
    ...getRule('convert-reject-to-throw'),
    ...getRule('add-missing-await'),
    'remove-useless-async': removeUselessAsync,
};

