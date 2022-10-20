'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('apply-exponentiation'),
    ...getRule('convert-sqrt-to-hypot'),
};

