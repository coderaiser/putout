'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('add-missing'),
    ...getRule('remove-useless'),
};

