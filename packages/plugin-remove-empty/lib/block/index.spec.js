'use strict';

const {createTest} = require('@putout/test');
const removeEmptyBlock = require('.');

const test = createTest(__dirname, {
    'remove-empty-block': removeEmptyBlock,
});

test('plugin-remove-empty: block: report', (t) => {
    t.report('not-function', 'Empty block statement');
    t.end();
});

test('plugin-remove-empty: no report: block: else', (t) => {
    t.noReport('else-comment');
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

test('plugin-remove-empty: block: else-comment', (t) => {
    t.noTransform('else-comment');
    t.end();
});

test('plugin-remove-empty: block: comments', (t) => {
    t.noTransform('comments');
    t.end();
});

test('plugin-remove-empty: block: else', (t) => {
    t.transform('else');
    t.end();
});

test('plugin-remove-empty: block: else if', (t) => {
    t.transform('else-if', '\n');
    t.end();
});

test('plugin-remove-empty: block: if test call', (t) => {
    t.transform('if-test-call');
    t.end();
});

test('plugin-remove-empty: block: block-fn', (t) => {
    t.transform('block-fn');
    t.end();
});

