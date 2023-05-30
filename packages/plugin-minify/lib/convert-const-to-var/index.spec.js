'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['convert-const-to-var', plugin],
    ],
});

test('plugin-minify: convert-const-to-var: report', (t) => {
    t.report('convert-const-to-var', `Use 'var' instead of 'const'`);
    t.end();
});

test('plugin-minify: convert-const-to-var: transform', (t) => {
    t.transform('convert-const-to-var');
    t.end();
});
