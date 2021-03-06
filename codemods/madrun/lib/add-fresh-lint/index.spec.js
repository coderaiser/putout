'use strict';

const test = require('@putout/test')(__dirname, {
    'add-fresh-lint': require('.'),
});

test('madrun: add fresh:lint: report', (t) => {
    t.report('lint', 'fresh:lint should exist');
    t.end();
});

test('madrun: add fresh:lint: transform: lint', (t) => {
    t.transform('lint');
    t.end();
});

test('madrun: add fresh:lint: transform: lint-esm', (t) => {
    t.transform('lint-esm');
    t.end();
});

test('madrun: add fresh:lint: transform: exists', (t) => {
    t.noTransform('exists');
    t.end();
});

