'use strict';

const {createTest} = require('@putout/test');
const plugin = require('./index.js');

const test = createTest(__dirname, {
    plugins: [
        ['install-bun', plugin],
    ],
});

test('packages: install-bun: report', (t) => {
    t.report('install-bun', `Install Bun`);
    t.end();
});

test('packages: install-bun: transform', (t) => {
    t.transform('install-bun');
    t.end();
});

test('packages: install-bun: no transform: no-checkout', (t) => {
    t.noTransform('no-checkout');
    t.end();
});

test('packages: install-bun: no report: exists', (t) => {
    t.noReport('exists');
    t.end();
});

test('packages: install-bun: no report: version', (t) => {
    t.noReport('version');
    t.end();
});

test('packages: install-bun: no report: wrong-place', (t) => {
    t.noReport('wrong-place');
    t.end();
});

test('packages: install-bun: transform: checkout-with-name', (t) => {
    t.transform('checkout-with-name');
    t.end();
});
