'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['apply-create-eslint-config', plugin],
    ],
});

test('eslint: apply-create-eslint-config: report', (t) => {
    t.report('apply-create-eslint-config', `Use 'createESLintConfig()' instead of spread ('...')`);
    t.end();
});

test('eslint: apply-create-eslint-config: transform', (t) => {
    t.transform('apply-create-eslint-config');
    t.end();
});

test('eslint: apply-create-eslint-config: no report: no-spread', (t) => {
    t.noReport('no-spread');
    t.end();
});
