'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('map'),
    ...getRule('for-each'),
    ...getRule('for-n'),
    ...getRule('for-length'),
    ...getRule('for-entries'),
    ...getRule('for-entries-n'),
    ...getRule('for-in-negative'),
    ...getRule('for-in-positive'),
    ...getRule('reduce'),
    ...getRule('remove-useless'),
    ...getRule('remove-useless-variables'),
    ...getRule('remove-useless-array-from'),
    ...getRule('remove-unused-variables'),
};

