'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('remove-nyc'),
    ...getRule('add-type'),
};

