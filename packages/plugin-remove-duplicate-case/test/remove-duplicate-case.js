'use strict';

const removeDebugger = require('..');
const test = require('@putout/test')(__dirname, {
    'remove-duplicate-case': removeDebugger,
});

test('remove duplicate-case: report', (t) => {
    t.report('case', 'Duplicate case should be avoided');
    t.end();
});

test('remove duplicate-case: transform: duplicate', (t) => {
    t.transform('case');
    t.end();
});

test('remove duplicate-case: no transform: no-duplicate', (t) => {
    t.noTransform('no-duplicate');
    t.end();
});

