'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('set-node-versions'),
    ...getRule('disable-cache'),
};
