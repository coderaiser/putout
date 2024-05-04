'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['update-ecma-version', plugin],
    ],
});

test('eslint-plugin: update-ecma-version: report', (t) => {
    t.report('update-ecma-version', `Set 'ecmaVersion' to: 2024`);
    t.end();
});

test('eslint-plugin: update-ecma-version: transform', (t) => {
    t.transform('update-ecma-version');
    t.end();
});

test('eslint-plugin: update-ecma-version: no report: more', (t) => {
    t.noReport('more');
    t.end();
});

test('eslint-plugin: update-ecma-version: no report after transform', (t) => {
    t.noReportAfterTransform('update-ecma-version');
    t.end();
});
