'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('remove-a-from-link'),
    ...getRule('convert-page-to-head'),
};

