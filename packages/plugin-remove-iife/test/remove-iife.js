'use strict';

const removeIife = require('..');

const test = require('@putout/test')(__dirname, {
    'remove-iife': removeIife,
});

test('remove iife: report', (t) => {
    t.report('iife', 'IIFE should be removed');
    t.end();
});

test('remove iife: transform', (t) => {
    t.transform('iife');
    t.end();
});

test('remove iife: no transform: return', (t) => {
    t.noTransform('return');
    t.end();
});

