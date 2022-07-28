'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('convert-switch-to-routes'),
    ...getRule('convert-component-to-element'),
};

