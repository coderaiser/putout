'use strict';

/* eslint node/no-unpublished-require:0 */
const removeEmptyBlock = require('.');
const test = require('@putout/test')(__dirname, {
    'remove-empty-block': removeEmptyBlock,
});

test('plugin-remove-empty: block: report', (t) => {
    t.report('not-function', 'Empty block statement');
    t.end();
});

test('plugin-remove-empty: block: function', (t) => {
    t.transform('function');
    t.end();
});

test('plugin-remove-empty: block: not function', (t) => {
    t.transform('not-function');
    t.end();
});

test('plugin-remove-empty: block: try-catch', (t) => {
    t.transform('try-catch');
    t.end();
});

test('plugin-remove-empty: block: try', (t) => {
    t.transform('try', '\n');
    t.end();
});

test('plugin-remove-empty: block: if-else', (t) => {
    t.transform('if-else', '\n');
    t.end();
});

test('plugin-remove-empty: block: empty if', (t) => {
    t.transform('empty-if');
    t.end();
});

test('plugin-remove-empty: block: empty if: not binary expression', (t) => {
    t.transform('empty-if-not-binary');
    t.end();
});

test('plugin-remove-empty: block: else if', (t) => {
    t.transform('else-if', '\n');
    t.end();
});

