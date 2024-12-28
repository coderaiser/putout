'use strict';

const {createTest} = require('@putout/test');
const plugin = require('./index.js');

const test = createTest(__dirname, {
    plugins: [
        ['convert-rc-to-flat', plugin],
    ],
});

test('eslint: convert-rc-to-flat: report', (t) => {
    t.report('convert-rc-to-flat', `Use FlatConfig instead of ESLintRC`);
    t.end();
});

test('eslint: convert-rc-to-flat: transform', (t) => {
    t.transform('convert-rc-to-flat');
    t.end();
});
