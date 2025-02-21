'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['remove-create-eslint-config-with-one-argument', plugin],
    ],
});

test('eslint: remove-create-eslint-config-with-one-argument: report', (t) => {
    t.report('remove-create-eslint-config-with-one-argument', `Remove 'createESLintConfig()' with one argument`);
    t.end();
});

test('eslint: remove-create-eslint-config-with-one-argument: transform', (t) => {
    t.transform('remove-create-eslint-config-with-one-argument');
    t.end();
});
