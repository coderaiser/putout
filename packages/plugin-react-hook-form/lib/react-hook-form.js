'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('apply-clear-errors'),
    ...getRule('convert-as-to-render'),
    ...getRule('remove-value-from-control'),
};

