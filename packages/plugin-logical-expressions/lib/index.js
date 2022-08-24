'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('simplify'),
    ...getRule('remove-boolean'),
    ...getRule('remove-duplicates'),
    ...getRule('convert-bitwise-to-logical'),
};

