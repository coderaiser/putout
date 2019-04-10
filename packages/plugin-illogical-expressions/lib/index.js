'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('identifier-with-couple-values'),
};

