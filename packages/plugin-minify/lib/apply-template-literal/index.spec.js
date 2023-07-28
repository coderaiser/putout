'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['apply-template-literal', plugin],
    ],
});

test('plugin-minify: apply-template-literal: report', (t) => {
    t.report('apply-template-literal', `Use 'template literal' to stringify value`);
    t.end();
});

test('plugin-minify: apply-template-literal: transform', (t) => {
    t.transform('apply-template-literal');
    t.end();
});
