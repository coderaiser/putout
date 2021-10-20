'use strict';

const test = require('@putout/test')(__dirname, {
    'convert-array-copy-to-slice': require('..'),
});

test('plugin-convert-array-copy-to-slice: report', (t) => {
    t.report('spread', 'Array should be copied using slice');
    t.end();
});

test('plugin-convert-array-copy-to-slice: transform', (t) => {
    t.transform('spread');
    t.end();
});

test('plugin-convert-array-copy-to-slice: no transform: elements', (t) => {
    t.noTransform('elements');
    t.end();
});

test('plugin-convert-array-copy-to-slice: no transform: set', (t) => {
    t.noTransform('set');
    t.end();
});

test('plugin-convert-array-copy-to-slice: no transform: set-map', (t) => {
    t.noTransform('set-map');
    t.end();
});

test('plugin-convert-array-copy-to-slice: no transform: arg-to-set', (t) => {
    t.noTransform('arg-to-set');
    t.end();
});

test('plugin-convert-array-copy-to-slice: no transform: no-binding', (t) => {
    t.noTransform('no-binding');
    t.end();
});

test('plugin-convert-array-copy-to-slice: no transform: fn', (t) => {
    t.noTransform('fn');
    t.end();
});
