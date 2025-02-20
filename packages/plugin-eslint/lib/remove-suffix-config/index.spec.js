'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['remove-suffix-config', plugin],
    ],
});

test('eslint: remove-suffix-config: report', (t) => {
    t.report('remove-suffix-config', `Avoid suffix config when import from 'eslint-plugin-putout'`);
    t.end();
});

test('eslint: remove-suffix-config: transform', (t) => {
    t.transform('remove-suffix-config');
    t.end();
});
