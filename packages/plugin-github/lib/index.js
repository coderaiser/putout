'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('add-continue-on-error-to-coveralls'),
    ...getRule('add-continue-on-error-to-add-and-commit'),
    ...getRule('set-node-versions'),
    ...getRule('set-checkout-version'),
    ...getRule('set-coveralls-version'),
    ...getRule('set-setup-node-version'),
    ...getRule('set-add-and-commit'),
};
