'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('add-madrun-to-lint'),
    ...getRule('rename-predefined-eslint-to-putout'),
};

