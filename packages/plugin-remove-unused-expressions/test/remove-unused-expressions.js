'use strict';

const {createTest} = require('@putout/test');
const removeUnusedExpression = require('..');

const test = createTest(__dirname, {
    'remove-unused-expression': removeUnusedExpression,
});

test('remove unused expression: report', (t) => {
    t.reportCode('error;', 'Unused expression statement');
    t.end();
});

test('remove unused expression: transformCode', (t) => {
    t.transformCode('error;', '');
    t.end();
});

test('remove unused expression: transformCode: used', (t) => {
    const code = 'fn()';
    
    t.noTransformCode(code);
    t.end();
});

test('remove unused expression: transformCode: string', (t) => {
    const code = '"hello"';
    
    t.transformCode(code, '');
    t.end();
});

test('remove unused expression: transformCode: object', (t) => {
    t.transformCode('({a: 1})', '');
    t.end();
});

test('remove unused expression: transformCode: array', (t) => {
    t.transformCode('[1, 2, 3]', '');
    t.end();
});

test('remove unused expression: transformCode: member expression', (t) => {
    t.transformCode('this.hello;', '');
    t.end();
});

test('remove unused expression: transformCode: not', (t) => {
    t.transformCode('!a;', '');
    t.end();
});

test('remove unused expression: transform: duplicate strict mode', (t) => {
    t.transform('duplicate-strict-mode');
    t.end();
});
