'use strict';

const simplifyLogicalExpression = require('..');

const test = require('@putout/test')(__dirname, {
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

