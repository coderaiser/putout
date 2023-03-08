'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('array'),
    ...getRule('empty-array'),
    ...getRule('fn'),
    ...getRule('noop'),
    ...getRule('declare'),
};

