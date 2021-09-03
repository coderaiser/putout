'use strict';

const removeEmpty = require('..');
const test = require('@putout/test')(__dirname, {
    'remove-empty': removeEmpty,
});

test('plugin-remove-empty: complex: report: block', (t) => {
    t.report('not-function', 'Empty block statement');
    t.end();
});

test('plugin-remove-empty: report: block', (t) => {
    t.report('pattern', 'Avoid empty patterns');
    t.end();
});

test('plugin-remove-empty: transform: block: function', (t) => {
    t.transform('function');
    t.end();
});

test('plugin-remove-empty: transform: block: not function', (t) => {
    t.transform('not-function');
    t.end();
});

test('plugin-remove-empty: transform: pattern', (t) => {
    t.transform('pattern', '\n');
    t.end();
});

