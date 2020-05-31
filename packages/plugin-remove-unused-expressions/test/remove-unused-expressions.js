'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-unused-expression': require('..'),
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

test('remove unused expression: transformCode: used', (t) => {
    const from = `"use strict"; "use strict";`;
    const to = `'use strict';`;
    
    t.transformCode(from, to);
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

