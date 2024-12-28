'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['convert-multiply-to-generator', plugin],
    ],
});

test('generators: convert-multiply-to-generator: report', (t) => {
    t.report('convert-multiply-to-generator', `Use 'if condition' instead of 'ternary expression'`);
    t.end();
});

test('generators: convert-multiply-to-generator: transform', (t) => {
    t.transform('convert-multiply-to-generator');
    t.end();
});
