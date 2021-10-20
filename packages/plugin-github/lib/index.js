'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('set-node-versions'),
    ...getRule('set-checkout-version'),
    ...getRule('set-setup-node-version'),
};

