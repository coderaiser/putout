'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('simplify'),
    ...getRule('optimize'),
    ...getRule('convert-to-string'),
    ...getRule('convert-replace-to-replace-all'),
};

