'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('apply-literal-notation'),
    ...getRule('optimize'),
    ...getRule('convert-to-string'),
    ...getRule('convert-replace-to-replace-all'),
    ...getRule('remove-useless-group'),
    ...getRule('remove-useless-regexp'),
};

module.exports.isSimpleRegExp = require('./is-simple-regexp');

