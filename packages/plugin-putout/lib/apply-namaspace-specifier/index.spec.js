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
    t.report('apply-namaspace-specifier', `Use 'import * as plugin' instead of 'import plugin'`);
    t.end();
});

test('packages: apply-namaspace-specifier: transform', (t) => {
    t.transform('apply-namaspace-specifier');
    t.end();
});

test('packages: apply-namaspace-specifier: transform: rules', (t) => {
    t.transform('rules');
    t.end();
});

test('packages: apply-namaspace-specifier: no report: exists', (t) => {
    t.noReport('exists');
    t.end();
});

test('packages: apply-namaspace-specifier: no report: no-spec', (t) => {
    t.noReport('no-spec');
    t.end();
});
