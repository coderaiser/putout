'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('await'),
    ...getRule('args'),
    ...getRule('declare'),
    ...getRule('expand-arguments'),
    ...getRule('sync'),
    ...getRule('async'),
};

