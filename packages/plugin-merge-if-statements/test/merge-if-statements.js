'use strict';

const test = require('@putout/test')(__dirname, {
    'merge-if-statements': require('..'),
});

test('plugin-merge-if-statements: transform: report', (t) => {
    t.report('if', 'If statements should be merged');
    t.end();
});

test('plugin-merge-if-statements: transform: if', (t) => {
    t.transform('if');
    t.end();
});

test('plugin-merge-if-statements: transform: else', (t) => {
    t.noTransform('else');
    t.end();
});

test('plugin-merge-if-statements: transform: inner else', (t) => {
    t.noTransform('inner-else');
    t.end();
});

test('plugin-merge-if-statements: transform: empty', (t) => {
    t.transform('empty');
    t.end();
});
