'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-double-negation': require('..'),
});

test('plugin-remove-double-negation: transform: report', (t) => {
    t.report('if', 'Double negation should not be used in conditions');
    t.end();
});

test('plugin-remove-double-negation: transform: if', (t) => {
    t.transform('if');
    t.end();
});

test('plugin-remove-double-negation: transform: var', (t) => {
    t.noTransform('var');
    t.end();
});

test('plugin-remove-double-negation: transform: bitwise', (t) => {
    t.noTransform('bitwise');
    t.end();
});

test('plugin-remove-double-negation: transform: not bitwise', (t) => {
    t.noTransform('not-bitwise');
    t.end();
});

test('plugin-remove-double-negation: transform: logical', (t) => {
    t.transform('logical');
    t.end();
});

test('plugin-remove-double-negation: transform: conditional', (t) => {
    t.transform('conditional');
    t.end();
});

