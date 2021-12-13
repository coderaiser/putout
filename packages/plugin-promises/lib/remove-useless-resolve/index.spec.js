'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');
const test = createTest(__dirname, {
    'promises/remove-useless-resolve': convert,
});

test('plugin-remove-useless-resolve: exports: transform: report', (t) => {
    t.report('resolve', 'Resolve is useless in async functions, use return value instead');
    t.end();
});

test('plugin-remove-useless-resolve: transform', (t) => {
    t.transform('resolve');
    t.end();
});

test('plugin-remove-useless-resolve: transform: no args', (t) => {
    t.transform('no-args');
    t.end();
});

test('plugin-remove-useless-resolve: no transform', (t) => {
    t.noTransform('not-fn');
    t.end();
});

test('plugin-remove-useless-resolve: no transform: not async', (t) => {
    t.noTransform('not-async');
    t.end();
});

test('plugin-remove-useless-resolve: no report: not async', (t) => {
    t.noReport('not-async');
    t.end();
});
