'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['apply-define-config', plugin],
    ],
});

test('eslint: apply-define-config: report', (t) => {
    t.report('apply-define-config', `Use 'defineConfig' instead of 'createESLintConfig'`);
    t.end();
});

test('eslint: apply-define-config: transform', (t) => {
    t.transform('apply-define-config');
    t.end();
});
