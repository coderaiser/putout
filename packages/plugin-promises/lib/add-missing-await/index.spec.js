'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');
const test = createTest(__dirname, {
    'promises/add-missing-await': convert,
});

test('plugin-add-missing-await: exports: transform: report', (t) => {
    t.report('async', `Call async functions using 'await'`);
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

test('plugin-add-missing-await: no transform: not call', (t) => {
    t.noTransform('not-call');
    t.end();
});

test('plugin-add-missing-await: no transform: not async', (t) => {
    t.noTransform('not-async');
    t.end();
});

test('plugin-add-missing-await: no transform: not fn', (t) => {
    t.noTransform('not-fn');
    t.end();
});

test('plugin-add-missing-await: no transform: array', (t) => {
    t.noTransform('array');
    t.end();
});

test('plugin-add-missing-await: no transform: top-level', (t) => {
    t.noTransform('top-level');
    t.end();
});

test('plugin-add-missing-await: no transform: catch', (t) => {
    t.noTransform('catch');
    t.end();
});
