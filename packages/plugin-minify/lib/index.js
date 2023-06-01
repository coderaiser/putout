'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('apply-ternary'),
    ...getRule('convert-const-to-var'),
    ...getRule('convert-if-to-logical'),
    ...getRule('convert-strict-equal-to-equal'),
    ...getRule('extract-body'),
    ...getRule('expand-bindings'),
    ...getRule('mangle-names'),
    ...getRule('merge-variables'),
    ...getRule('shorten-names'),
    ...getRule('remove-return-undefined'),
    ...getRule('types'),
};
