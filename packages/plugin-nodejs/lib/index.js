'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('convert-buffer-to-buffer-alloc'),
    ...getRule('convert-fs-promises'),
    ...getRule('convert-promisify-to-fs-promises'),
    ...getRule('convert-dirname-to-url'),
    ...getRule('convert-url-to-dirname'),
    ...getRule('convert-top-level-return'),
    ...getRule('declare'),
    ...getRule('declare-after-require'),
    ...getRule('remove-process-exit'),
};

