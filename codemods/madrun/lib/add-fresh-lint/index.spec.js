'use strict';

const {createTest} = require('@putout/test');

const addFreshLint = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['add-fresh-lint', addFreshLint],
    ],
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

test('madrun: add fresh:lint: no transform: exists', (t) => {
    t.noTransform('exists');
    t.end();
});
