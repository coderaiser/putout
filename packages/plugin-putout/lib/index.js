'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('convert-to-no-transform-code'),
    ...getRule('convert-find-to-traverse'),
    ...getRule('convert-replace-with'),
    ...getRule('convert-destructuring-to-identifier'),
    ...getRule('convert-replace-with-multiple'),
    ...getRule('convert-babel-types'),
    ...getRule('convert-node-to-path-in-get-template-values'),
    ...getRule('convert-traverse-to-include'),
    ...getRule('convert-process-to-find'),
    ...getRule('rename-operate-to-operator'),
    ...getRule('replace-operate-with-operator'),
    ...getRule('shorten-imports'),
};

