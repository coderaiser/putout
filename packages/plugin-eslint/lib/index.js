'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = getRule('move-putout-to-end-of-extends');

