'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['mjs-file', plugin],
    ],
});

test('packages: mjs-file: report', (t) => {
    t.report('mjs-file', `Use 'ESM' instead of 'CommonJS'`);
    t.end();
});

test('packages: mjs-file: transform', (t) => {
    t.transform('mjs-file');
    t.end();
});
