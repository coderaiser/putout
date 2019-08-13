'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('rename'),
    ...getRule('remove'),
    ...getRule('await'),
    ...getRule('for-of'),
};

