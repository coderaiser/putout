'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['cjs-file', plugin],
    ],
});

test('packages: cjs-file: report', (t) => {
    t.report('cjs-file', `Use 'CommonJS' instead of 'ESM'`);
    t.end();
});

test('packages: cjs-file: transform', (t) => {
    t.transform('cjs-file');
    t.end();
});

test('packages: cjs-file: no report: commonjs', (t) => {
    t.noReport('commonjs');
    t.end();
});
