'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['eslint-plugin/apply-source-code', plugin],
    ],
});

test('putout: plugin-eslint: apply-source-code: report', (t) => {
    t.report('apply-source-code', `Use 'context.sourceCode' instead of 'context.getSourceCode()'`);
    t.end();
});

test('putout: plugin-eslint: apply-source-code: transform', (t) => {
    t.transform('apply-source-code');
    t.end();
});
