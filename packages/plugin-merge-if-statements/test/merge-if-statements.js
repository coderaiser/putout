'use strict';

const test = require('@putout/test')(__dirname, {
    'merge-destructuring-properties': require('..'),
});

test('plugin-merge-destructuring-properties: transform: report', (t) => {
    t.report('if', 'If statements should be merged');
    t.end();
});

test('plugin-merge-destructuring-properties: transform: if', (t) => {
    t.transform('if');
    t.end();
});

test('plugin-merge-destructuring-properties: transform: else', (t) => {
    t.noTransform('else');
    t.end();
});

test('plugin-merge-destructuring-properties: transform: else', (t) => {
    t.noTransform('inner-else');
    t.end();
});

test('plugin-merge-destructuring-properties: transform: else', (t) => {
    t.transform('empty');
    t.end();
});
