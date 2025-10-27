'use strict';

const {createTest} = require('@putout/test');
const convertArrayCopyToSlice = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['convert-array-copy-to-slice', convertArrayCopyToSlice],
    ],
});

test('plugin-convert-array-copy-to-slice: report: spread', (t) => {
    t.report('spread', `Copy array with '.slice()'`);
    t.end();
});

test('plugin-convert-array-copy-to-slice: no report: ternary', (t) => {
    t.noReport('ternary');
    t.end();
});

test('plugin-convert-array-copy-to-slice: transform: spread', (t) => {
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
