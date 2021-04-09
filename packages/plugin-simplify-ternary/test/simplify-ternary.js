'use strict';

const test = require('@putout/test')(__dirname, {
    'simplify-ternary': require('..'),
});

test('plugin-simplify-ternary: report', (t) => {
    t.report('identifier', 'Unnecessary use of conditional expression for default assignment');
    t.end();
});

test('plugin-simplify-ternary: transform', (t) => {
    t.transform('identifier');
    t.end();
});

test('plugin-simplify-ternary: transform', (t) => {
    t.transform('object');
    t.end();
});

test('plugin-simplify-ternary: transform: duplicate', (t) => {
    t.transform('duplicate');
    t.end();
});

test('plugin-simplify-ternary: no: transform: different test and consequent', (t) => {
    t.noTransform('diff');
    t.end();
});

