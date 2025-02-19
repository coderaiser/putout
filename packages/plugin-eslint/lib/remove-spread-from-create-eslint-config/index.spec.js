'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['remove-spread-from-create-eslint-config', plugin],
    ],
});

test('eslint: remove-spread-from-create-eslint-config: report', (t) => {
    t.report('remove-spread-from-create-eslint-config', `Avoid spread ('...') in 'createEslintConfig'`);
    t.end();
});

test('eslint: remove-spread-from-create-eslint-config: transform', (t) => {
    t.transform('remove-spread-from-create-eslint-config');
    t.end();
});
