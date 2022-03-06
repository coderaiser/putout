'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');
const test = createTest(__dirname, {
    'tape/expand-try-catch-arguments': convert,
});

test('plugin-tape: expand-try-catch-arguments: report', (t) => {
    t.report('try-catch', 'try-catch arguments should be expanded');
    t.end();
});

test('plugin-tape: expand-try-catch-arguments: transform', (t) => {
    t.transform('try-catch');
    t.end();
});

test('plugin-tape: expand-try-catch-arguments: transform: arg', (t) => {
    t.transform('arg');
    t.end();
});

test('plugin-tape: expand-try-catch-arguments: not fn', (t) => {
    t.noTransform('not-fn');
    t.end();
});

test('plugin-tape: expand-try-catch-arguments: not call', (t) => {
    t.noTransform('not-call');
    t.end();
});

