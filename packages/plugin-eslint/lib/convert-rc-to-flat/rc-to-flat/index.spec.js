'use strict';

const plugin = require('./index.js');
const {createTest} = require('@putout/test');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['convert-eslintrc-to-flat', plugin],
    ],
});

test('eslint: convert-rc-to-flat: rc-to-flat: report', (t) => {
    t.report('convert-eslintrc-to-flat', `Use FlatConfig instead of ESLintRC`);
    t.end();
});

test('eslint: convert-rc-to-flat: rc-to-flat: transform', (t) => {
    t.transform('convert-eslintrc-to-flat');
    t.end();
});

