'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-useless-spread/array': require('.'),
});

test('plugin-remove-useless-spread: array: report', (t) => {
    t.report('for-of', 'Useless spread should be avoided');
    t.end();
});

test('plugin-remove-useless-spread: array: transform: array', (t) => {
    t.transform('for-of');
    t.end();
});

test('plugin-remove-useless-spread: array: transform: call', (t) => {
    t.transform('call');
    t.end();
});

test('plugin-remove-useless-spread: array: transform: call-args', (t) => {
    t.transform('call-args');
    t.end();
});

test('plugin-remove-useless-spread: array: no transform: not-call', (t) => {
    t.noTransform('not-call');
    t.end();
});

test('plugin-remove-useless-spread: array: no transform: map', (t) => {
    t.noTransform('map');
    t.end();
});

test('plugin-remove-useless-spread: array: transform: multiple', (t) => {
    t.transform('multiple');
    t.end();
});

test('plugin-remove-useless-spread: array: transform: array-from', (t) => {
    t.transform('array-from');
    t.end();
});

