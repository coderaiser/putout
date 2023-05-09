'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('remove-args'),
    ...getRule('apply-breakline'),
    ...getRule('apply-linebreak'),
    ...getRule('apply-computed-print'),
    ...getRule('add-args'),
};
