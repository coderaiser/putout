'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('switch-expected-with-result'),
    ...getRule('convert-tape-to-supertape'),
};

