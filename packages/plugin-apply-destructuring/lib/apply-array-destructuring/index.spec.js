'use strict';

const applyDestructuring = require('.');

/* eslint node/no-unpublished-require:0 */
const test = require('@putout/test')(__dirname, {
    'apply-array-destructuring': applyDestructuring,
});

test('plugin-apply-destructuring: report: array: report', (t) => {
    t.report('assignment', 'Array destructuring should be used');
    t.end();
});

test('plugin-apply-destructuring: report: array: report', (t) => {
    t.report('variable-declarator', 'Array destructuring should be used');
    t.end();
});

test('plugin-apply-destructuring: transform: array: variable-declarator', (t) => {
    t.transform('variable-declarator');
    t.end();
});

test('plugin-apply-destructuring: transform: array: variable-declarator: let', (t) => {
    t.transform('let');
    t.end();
});

test('plugin-apply-destructuring: transform: array: assignment', (t) => {
    t.transform('assignment');
    t.end();
});

test('plugin-apply-destructuring: transform: array: second', (t) => {
    t.transform('second');
    t.end();
});

test('plugin-apply-destructuring: transform: array: type', (t) => {
    t.transform('type');
    t.end();
});

test('plugin-apply-destructuring: transform: array: nested', (t) => {
    t.noTransform('nested');
    t.end();
});

test('plugin-apply-destructuring: transform: array: nested assign', (t) => {
    t.noTransform('nested-assign');
    t.end();
});

test('plugin-apply-destructuring: transform: array: object', (t) => {
    t.noTransform('object');
    t.end();
});

