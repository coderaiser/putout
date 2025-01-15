'use strict';

const {createTest} = require('@putout/test');
const simplifyTernary = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['simplify-ternary', simplifyTernary],
    ],
});

test('plugin-simplify-ternary: report: identifier', (t) => {
    t.report('identifier', 'Simplify ternary');
    t.end();
});

test('plugin-simplify-ternary: transform: identifier', (t) => {
    t.transform('identifier');
    t.end();
});

test('plugin-simplify-ternary: transform: object', (t) => {
    t.transform('object');
    t.end();
});

test('plugin-simplify-ternary: no transform: no duplicate', (t) => {
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

test('plugin-simplify-ternary: transform: spread', (t) => {
    t.transform('spread');
    t.end();
});

test('plugin-simplify-ternary: transform: distribute', (t) => {
    t.transform('distribute');
    t.end();
});
