'use strict';

const test = require('@putout/test')(__dirname, {
    'convert-arguments-to-spread': require('..'),
});

test('plugin-convert-arguments-to-spread: report', (t) => {
    t.report('arguments', '"spread" should be used instead of "arguments"');
    t.end();
});

test('plugin-convert-arguments-to-spread: transform', (t) => {
    t.transform('arguments');
    t.end();
});

test('plugin-convert-arguments-to-spread: transform: args exists', (t) => {
    t.transform('args');
    t.end();
});

test('plugin-convert-arguments-to-spread: transform: params', (t) => {
    t.transform('params');
    t.end();
});

