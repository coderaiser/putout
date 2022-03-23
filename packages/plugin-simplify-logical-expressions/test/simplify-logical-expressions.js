'use strict';

const {createTest} = require('@putout/test');
const simplifyLogicalExpression = require('..');

const test = createTest(__dirname, {
    'simplify-logical-expression': simplifyLogicalExpression,
});

test('plugin-simplify-logical-expression: report', (t) => {
    t.report('not', 'Logical expression should be simplified');
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

