'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['cts-file', plugin],
    ],
});

test('typescript: cts-file: report', (t) => {
    t.report('cts-file', `Use 'CommonJS' instead of 'ESM'`);
    t.end();
});

test('typescript: cts-file: transform', (t) => {
    t.transform('cts-file');
    t.end();
});
