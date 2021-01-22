'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('add-putoutcache'),
    ...getRule('add-vim-files'),
    ...getRule('add-nyc-output'),
};

