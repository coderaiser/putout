'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('add-type'),
    ...getRule('remove-nyc'),
    ...getRule('remove-commit-type'),
};

