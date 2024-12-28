'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['convert-esm-to-commonjs', plugin],
    ],
});

test('typescript: convert-esm-to-commonjs: report', (t) => {
    t.report('convert-esm-to-commonjs', `Use 'CommonJS' instead of 'ESM'`);
    t.end();
});

test('typescript: convert-esm-to-commonjs: transform', (t) => {
    t.transform('convert-esm-to-commonjs');
    t.end();
});
