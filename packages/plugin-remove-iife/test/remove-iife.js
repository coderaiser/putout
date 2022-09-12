'use strict';

const {createTest} = require('@putout/test');
const removeIife = require('..');

const test = createTest(__dirname, {
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

test('remove iife: transform: arrow', (t) => {
    t.transform('arrow');
    t.end();
});

test('remove iife: no transform: return', (t) => {
    t.noTransform('return');
    t.end();
});

