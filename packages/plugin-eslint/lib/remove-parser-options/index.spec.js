'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['remove-parser-options', plugin],
    ],
});

test('eslint: remove-parser-options: report', (t) => {
    t.report('remove-parser-options', `Avoid "parserOptions" in FlatConfig`);
    t.end();
});

test('eslint: remove-parser-options: transform', (t) => {
    t.transform('remove-parser-options');
    t.end();
});

test('eslint: remove-parser-options: no report: no-language-options', (t) => {
    t.noReport('no-language-options');
    t.end();
});

test('eslint: remove-parser-options: no report: babel-options', (t) => {
    t.noReport('babel-options');
    t.end();
});

test('eslint: remove-parser-options: no report: typescript-options', (t) => {
    t.noReport('typescript-options');
    t.end();
});

test('eslint: remove-parser-options: no report: has-parser', (t) => {
    t.noReport('has-parser');
    t.end();
});
