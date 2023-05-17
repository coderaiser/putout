'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('mangle-names'),
    ...getRule('remove-return-undefined'),
    ...getRule('types'),
};
