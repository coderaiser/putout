'use strict';

const {createTest} = require('@putout/test');
const addFunction = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['add-function', addFunction],
    ],
});

test('madrun: add function: report: string', (t) => {
    t.report('string', 'function should be used instead of string in script "hello');
    t.end();
});

test('madrun: add function: transform: string', (t) => {
    t.transform('string');
    t.end();
});

test('madrun: add function: no transform: exports', (t) => {
    t.noTransform('exports');
    t.end();
});

test('madrun: add function: transform: call', (t) => {
    t.transform('call');
    t.end();
});

test('madrun: add function: transform: no-exports', (t) => {
    t.transform('no-exports');
    t.end();
});

test('madrun: add function: transform: export-default', (t) => {
    t.transform('export-default');
    t.end();
});

test('madrun: add function: report: identifier', (t) => {
    t.report('identifier', 'function should be used instead of string in script "build');
    t.end();
});
