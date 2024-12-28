'use strict';

const {createTest} = require('@putout/test');
const array = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['remove-useless-spread/array', array],
    ],
});

test('plugin-remove-useless-spread: array: report', (t) => {
    t.report('for-of', `Avoid useless spread '...'`);
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

test('plugin-remove-useless-spread: array: transform: constructor', (t) => {
    t.transform('constructor');
    t.end();
});

test('plugin-remove-useless-spread: array: no transform: multiple', (t) => {
    t.noTransform('multiple');
    t.end();
});

test('plugin-remove-useless-spread: array: transform: array-from', (t) => {
    t.transform('array-from');
    t.end();
});

test('plugin-remove-useless-spread: array: transform: set', (t) => {
    t.transform('set');
    t.end();
});

test('plugin-remove-useless-spread: array: no transform: values', (t) => {
    t.noTransform('values');
    t.end();
});

test('plugin-remove-useless-spread: array: transform: keys', (t) => {
    t.transform('keys');
    t.end();
});
