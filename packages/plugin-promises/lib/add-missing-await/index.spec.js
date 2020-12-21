'use strict';

const convert = require('.');
const test = require('@putout/test')(__dirname, {
    'promises/add-missing-await': convert,
});

test('plugin-add-missing-await: exports: transform: report', (t) => {
    t.report('async', 'Async functions should be called using await');
    t.end();
});

test('plugin-add-missing-await: transform', (t) => {
    t.transform('async');
    t.end();
});

test('plugin-add-missing-await: transform: switch', (t) => {
    t.transform('switch');
    t.end();
});

test('plugin-add-missing-await: transform: not call', (t) => {
    t.noTransform('not-call');
    t.end();
});

test('plugin-add-missing-await: transform: not async', (t) => {
    t.noTransform('not-async');
    t.end();
});

test('plugin-add-missing-await: transform: not async', (t) => {
    t.noTransform('not-fn');
    t.end();
});

test('plugin-add-missing-await: transform: array', (t) => {
    t.noTransform('array');
    t.end();
});
