'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['mts-file', plugin],
    ],
});

test('typescript: mts-file: report', (t) => {
    t.report('mts-file', `Use 'ESM' instead of 'CommonJS'`);
    t.end();
});

test('typescript: mts-file: transform', (t) => {
    t.transform('mts-file');
    t.end();
});
