'use strict';

/* eslint node/no-unpublished-require:0 */
const addFunction = require('.');
const test = require('@putout/test')(__dirname, {
    'add-function': addFunction,
});

test('madrun: add function: report', (t) => {
    t.report('string', 'function should be used instead of string in script "hello');
    t.end();
});

test('madrun: add function: transform: string', (t) => {
    t.transform('string');
    t.end();
});

test('madrun: add function: transform: exports', (t) => {
    t.noTransform('exports');
    t.end();
});

test('madrun: add function: transform: call', (t) => {
    t.transform('call');
    t.end();
});

test('madrun: add function: transform: no exports', (t) => {
    t.transform('no-exports');
    t.end();
});

test('madrun: add function: transform: export-default', (t) => {
    t.transform('export-default');
    t.end();
});

