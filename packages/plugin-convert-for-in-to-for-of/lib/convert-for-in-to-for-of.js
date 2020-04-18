'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('positive'),
    ...getRule('negative'),
};

