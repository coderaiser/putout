'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('remove-return-undefined'),
    ...getRule('mangle-names'),
};
