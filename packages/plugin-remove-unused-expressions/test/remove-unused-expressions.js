import {createTest} from '@putout/test';
import * as removeUnusedExpression from '../lib/remove-unused-expressions.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-unused-expression', removeUnusedExpression],
    ],
});

test('remove unused expression: report', (t) => {
    t.reportCode('error;', 'Avoid unused expression statements');
    t.end();
});

test('remove unused expression: transformCode', (t) => {
    t.transformCode('error;', '\n');
    t.end();
});

test('remove unused expression: transformCode: used', (t) => {
    const code = 'fn();\n';
    
    t.noTransformCode(code);
    t.end();
});

test('remove unused expression: transformCode: string', (t) => {
    const code = '"hello"';
    
    t.transformCode(code, '\n');
    t.end();
});

test('remove unused expression: transformCode: object', (t) => {
    t.transformCode('({a: 1})', '\n');
    t.end();
});

test('remove unused expression: transformCode: array', (t) => {
    t.transformCode('[1, 2, 3]', '\n');
    t.end();
});

test('remove unused expression: transformCode: member expression', (t) => {
    t.transformCode('this.hello;', '\n');
    t.end();
});

test('remove unused expression: transformCode: not', (t) => {
    t.transformCode('!a;', '\n');
    t.end();
});

test('remove unused expression: transform: duplicate-strict-mode', (t) => {
    t.transform('duplicate-strict-mode');
    t.end();
});

test('remove unused expression: transform: logical', (t) => {
    t.transform('logical');
    t.end();
});

test('remove unused expression: no transform: assign', (t) => {
    t.noTransform('assign');
    t.end();
});

test('remove unused expression: no report: iife', (t) => {
    t.noReport('iife');
    t.end();
});

test('remove unused expression: no report: use-client', (t) => {
    t.noReport('use-client');
    t.end();
});

test('remove unused expression: transform: return', (t) => {
    t.transform('return');
    t.end();
});

test('remove unused expression: no report: return-block', (t) => {
    t.noReport('return-block');
    t.end();
});

test('remove unused expression: no report: return-no-args', (t) => {
    t.noReport('return-no-args');
    t.end();
});

test('remove unused expression: no report: import-assert', (t) => {
    t.noReport('import-assert');
    t.end();
});
