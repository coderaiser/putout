'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-iife': require('..'),
});

test('remove iife: report', (t) => {
    t.report('iife', 'IIFE should be removed');
    t.end();
});

test('remove iife: transform', (t) => {
    t.transform('iife');
    t.end();
});

