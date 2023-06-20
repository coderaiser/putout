'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = getRule('replace-plugin-with-creator');
