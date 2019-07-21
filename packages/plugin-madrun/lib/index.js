'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('add-function'),
    ...getRule('call-run'),
    ...getRule('rename-series-to-run'),
    ...getRule('convert-run-argument'),
};

