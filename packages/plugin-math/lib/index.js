'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('apply-exponentiation'),
    ...getRule('apply-multiplication'),
    ...getRule('convert-sqrt-to-hypot'),
};

