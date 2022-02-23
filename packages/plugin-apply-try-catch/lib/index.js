'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('try-catch'),
    ...getRule('try-to-catch'),
    ...getRule('await'),
    ...getRule('args'),
};

