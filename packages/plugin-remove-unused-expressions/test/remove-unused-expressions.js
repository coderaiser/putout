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

