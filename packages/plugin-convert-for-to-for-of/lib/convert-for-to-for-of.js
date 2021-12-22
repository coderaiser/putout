'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('n'),
    ...getRule('length'),
    ...getRule('entries'),
    ...getRule('entries-n'),
};

