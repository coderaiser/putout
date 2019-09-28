'use strict';

const addReturnAwait = require('@putout/plugin-add-return-await');

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    'add-return-await': addReturnAwait,
    ...getRule('remove-useless-resolve'),
    ...getRule('convert-reject-to-throw'),
};

