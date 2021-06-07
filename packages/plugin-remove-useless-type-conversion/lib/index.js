'use strict';

const withDoubleNegations = require('@putout/plugin-remove-double-negations');

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('named'),
    'with-double-negations': withDoubleNegations,
};

