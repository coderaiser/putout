'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('convert-to-no-transform-code'),
    ...getRule('convert-replace-with'),
};

