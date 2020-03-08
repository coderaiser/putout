'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('convert-to-no-transform-code'),
    ...getRule('convert-find-to-traverse'),
    ...getRule('convert-replace-with'),
    ...getRule('convert-replace-with-multiple'),
    ...getRule('convert-babel-types'),
    ...getRule('rename-operate-to-operator'),
    ...getRule('replace-operate-with-operator'),
};

