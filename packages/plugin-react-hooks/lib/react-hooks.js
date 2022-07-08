'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('apply-short-fragment'),
    ...getRule('declare'),
    ...getRule('remove-bind'),
    ...getRule('rename-method-under-score'),
    ...getRule('convert-state-to-hooks'),
    ...getRule('remove-this'),
    ...getRule('convert-class-to-function'),
    ...getRule('convert-component-to-use-state'),
    ...getRule('convert-import-component-to-use-state'),
};

