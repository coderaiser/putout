'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('convert-if-to-logical'),
    ...getRule('mangle-names'),
    ...getRule('remove-return-undefined'),
    ...getRule('types'),
};
