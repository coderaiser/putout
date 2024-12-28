'use strict';

const {createTest} = require('@putout/test');
const simplifyLogicalExpression = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['simplify-logical-expression', simplifyLogicalExpression],
    ],
});

test('plugin-simplify-logical-expression: report', (t) => {
    t.report('not', 'Simplify logical expression');
    t.end();
});

test('plugin-simplify-logical-expression: transform', (t) => {
    t.transform('not');
    t.end();
});

test('plugin-simplify-logical-expression: transform: wrong-not', (t) => {
    t.transform('wrong-not');
    t.end();
});

test('plugin-simplify-logical-expression: transform: instanceof', (t) => {
    t.transform('instanceof');
    t.end();
});

test('plugin-simplify-logical-expression: transform: in', (t) => {
    t.transform('in');
    t.end();
});

test('plugin-simplify-logical-expression: transform: duplicate', (t) => {
    t.transform('duplicate');
    t.end();
});

test('plugin-simplify-logical-expression: transform: array', (t) => {
    t.transform('array');
    t.end();
});

test('plugin-simplify-logical-expression: transform: object', (t) => {
    t.transform('object');
    t.end();
});

test('plugin-simplify-logical-expression: transform: same', (t) => {
    t.transform('same');
    t.end();
});

test('plugin-simplify-logical-expression: transform: not-not-equal', (t) => {
    t.transform('not-not-equal');
    t.end();
});

test('plugin-simplify-logical-expression: transform: block', (t) => {
    t.transform('block');
    t.end();
});

test('plugin-simplify-logical-expression: transform: not-condition', (t) => {
    t.transform('not-condition');
    t.end();
});

test('plugin-simplify-logical-expression: transform: constructor', (t) => {
    t.transform('constructor');
    t.end();
});

test('plugin-simplify-logical-expression: no transform: jsx', (t) => {
    t.noTransform('jsx');
    t.end();
});
