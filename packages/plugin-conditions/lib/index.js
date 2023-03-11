'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('apply-comparison-order'),
    ...getRule('apply-if'),
    ...getRule('evaluate'),
    ...getRule('convert-comparison-to-boolean'),
    ...getRule('convert-equal-to-strict-equal'),
    ...getRule('remove-boolean'),
    ...getRule('simplify'),
};

