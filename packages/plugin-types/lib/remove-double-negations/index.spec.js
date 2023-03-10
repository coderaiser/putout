'use strict';

const {createTest} = require('@putout/test');
const removeDoubleNegations = require('.');

const test = createTest(__dirname, {
    'remove-useless-type-conversion: with-double-negations': removeDoubleNegations,
});

test('plugin-remove-useless-type-conversion: with-double-negations: transform: report', (t) => {
    t.report('if', `Avoid double negations in conditions`);
    t.end();
});

test('plugin-remove-useless-type-conversion: with-double-negations: transform: if', (t) => {
    t.transform('if');
    t.end();
});

test('plugin-remove-useless-type-conversion: with-double-negations: no transform: var', (t) => {
    t.noTransform('var');
    t.end();
});

test('plugin-remove-useless-type-conversion: with-double-negations: no transform: bitwise', (t) => {
    t.noTransform('bitwise');
    t.end();
});

test('plugin-remove-useless-type-conversion: with-double-negations: no transform: not bitwise', (t) => {
    t.noTransform('not-bitwise');
    t.end();
});

test('plugin-remove-useless-type-conversion: with-double-negations: transform: logical', (t) => {
    t.transform('logical');
    t.end();
});

test('plugin-remove-useless-type-conversion: with-double-negations: transform: conditional', (t) => {
    t.transform('conditional');
    t.end();
});

test('plugin-remove-useless-type-conversions: with-double-negations: transform: includes', (t) => {
    t.transform('includes');
    t.end();
});

test('plugin-remove-useless-type-conversions: with-double-negations: transform: while', (t) => {
    t.transform('while');
    t.end();
});

test('plugin-remove-useless-type-conversions: with-double-negations: transform: do', (t) => {
    t.transform('do');
    t.end();
});

test('plugin-remove-useless-type-conversions: with-double-negations: transform: for', (t) => {
    t.transform('for');
    t.end();
});

test('plugin-remove-useless-type-conversions: with-double-negations: no transform: return', (t) => {
    t.noTransform('return');
    t.end();
});

test('plugin-remove-useless-type-conversion: no transform: jsx', (t) => {
    t.noTransform('jsx');
    t.end();
});
