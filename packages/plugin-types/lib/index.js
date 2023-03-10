'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('declare'),
    ...getRule('convert-typeof-to-is-type'),
    ...getRule('remove-useless-conversion'),
    ...getRule('remove-double-negations'),
    ...getRule('remove-useless-typeof'),
};

