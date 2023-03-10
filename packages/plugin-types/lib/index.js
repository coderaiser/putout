'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('apply-is-array'),
    ...getRule('declare'),
    ...getRule('convert-typeof-to-is-type'),
    ...getRule('remove-useless-conversion'),
    ...getRule('remove-double-negations'),
    ...getRule('remove-useless-typeof'),
};

