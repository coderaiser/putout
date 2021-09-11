'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('convert-boolean-to-string'),
    ...getRule('remove-empty'),
};

