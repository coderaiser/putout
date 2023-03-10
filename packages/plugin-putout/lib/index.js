'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('apply-processors-destructuring'),
    ...getRule('apply-async-formatter'),
    ...getRule('apply-create-test'),
    ...getRule('apply-remove'),
    ...getRule('apply-declare'),
    ...getRule('convert-putout-test-to-create-test'),
    ...getRule('convert-to-no-transform-code'),
    ...getRule('convert-find-to-traverse'),
    ...getRule('convert-destructuring-to-identifier'),
    ...getRule('convert-number-to-numeric'),
    ...getRule('convert-replace-with'),
    ...getRule('convert-replace-with-multiple'),
    ...getRule('convert-replace-to-function'),
    ...getRule('convert-match-to-function'),
    ...getRule('convert-babel-types'),
    ...getRule('convert-node-to-path-in-get-template-values'),
    ...getRule('convert-traverse-to-include'),
    ...getRule('convert-traverse-to-replace'),
    ...getRule('convert-process-to-find'),
    ...getRule('convert-method-to-property'),
    ...getRule('convert-add-argument-to-add-args'),
    ...getRule('convert-dirname-to-url'),
    ...getRule('convert-url-to-dirname'),
    ...getRule('convert-report-to-function'),
    ...getRule('replace-test-message'),
    ...getRule('rename-operate-to-operator'),
    ...getRule('replace-operate-with-operator'),
    ...getRule('shorten-imports'),
    ...getRule('check-replace-code'),
    ...getRule('declare'),
    ...getRule('add-args'),
    ...getRule('add-push'),
    ...getRule('move-require-on-top-level'),
    ...getRule('includer'),
};

