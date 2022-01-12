'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('convert-fs-promises'),
    ...getRule('convert-promisify-to-fs-promises'),
    ...getRule('convert-dirname-to-url'),
    ...getRule('remove-process-exit'),
};

