'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('convert-to-no-transform-code'),
    ...getRule('convert-find-to-traverse'),
    ...getRule('convert-replace-with'),
    ...getRule('convert-babel-types'),
};

