'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('apply-safe-align'),
    ...getRule('move-putout-to-end-of-extends'),
    ...getRule('convert-ide-to-safe'),
};

