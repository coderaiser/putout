'use strict';

const simplifyTernary = require('..');

const test = require('@putout/test')(__dirname, {
    'simplify-ternary': simplifyTernary,
});

test('plugin-simplify-ternary: report', (t) => {
    t.report('identifier', 'Ternary should be simplified');
    t.end();
});

test('plugin-simplify-ternary: transform', (t) => {
    t.transform('identifier');
    t.end();
});

test('plugin-simplify-ternary: transform: object', (t) => {
    t.transform('object');
    t.end();
});

test('plugin-simplify-ternary: transform: no duplicate', (t) => {
    t.noTransform('duplicate');
    t.end();
});

test('plugin-simplify-ternary: transform: simple-duplicate', (t) => {
    t.transform('simple-duplicate');
    t.end();
});

test('plugin-simplify-ternary: no transform: different test and consequent', (t) => {
    t.noTransform('diff');
    t.end();
});

test('plugin-simplify-ternary: transform: nested', (t) => {
    t.transform('nested');
    t.end();
});

test('plugin-simplify-ternary: transform: boolean', (t) => {
    t.transform('boolean');
    t.end();
});

test('plugin-simplify-ternary: transform: same', (t) => {
    t.transform('same');
    t.end();
});

