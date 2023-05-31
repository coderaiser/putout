'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('apply-ternary'),
    ...getRule('convert-if-to-logical'),
    ...getRule('convert-const-to-var'),
    ...getRule('extract-body'),
    ...getRule('mangle-names'),
    ...getRule('merge-variables'),
    ...getRule('shorten-names'),
    ...getRule('remove-return-undefined'),
    ...getRule('types'),
};
