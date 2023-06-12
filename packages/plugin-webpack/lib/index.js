'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('apply-externals'),
    ...getRule('convert-loader-to-use'),
    ...getRule('convert-query-loader-to-use'),
    ...getRule('convert-node-to-resolve-fallback'),
};
