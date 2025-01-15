'use strict';

const {createTest} = require('@putout/test');
const applyDestructuring = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['apply-array-destructuring', applyDestructuring],
    ],
});

test('plugin-apply-destructuring: report: assignment', (t) => {
    t.report('assignment', 'Use array destructuring');
    t.end();
});

test('plugin-apply-destructuring: report: variable-declarator', (t) => {
    t.report('variable-declarator', 'Use array destructuring');
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

test('plugin-apply-destructuring: no transform: array: nested', (t) => {
    t.noTransform('nested');
    t.end();
});

test('plugin-apply-destructuring: no transform: array: nested-assign', (t) => {
    t.noTransform('nested-assign');
    t.end();
});

test('plugin-apply-destructuring: no transform: array: object', (t) => {
    t.noTransform('object');
    t.end();
});

test('plugin-apply-destructuring: no transform: array: first', (t) => {
    t.noTransform('first');
    t.end();
});
