'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['apply-namaspace-specifier', plugin],
    ],
});

test('packages: apply-namaspace-specifier: report', (t) => {
    t.report('apply-namaspace-specifier', `Use 'if condition' instead of 'ternary expression'`);
    t.end();
});

test('packages: apply-namaspace-specifier: transform', (t) => {
    t.transform('apply-namaspace-specifier');
    t.end();
});
