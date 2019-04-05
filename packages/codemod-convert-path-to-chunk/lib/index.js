'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('convert-path-get'),
    ...getRule('rename-path-to-chunk'),
    ...getRule('remove-node-property'),
};

