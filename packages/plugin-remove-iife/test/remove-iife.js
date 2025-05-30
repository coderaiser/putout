import {createTest} from '@putout/test';
import * as removeIife from '../lib/remove-iife.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-iife', removeIife],
    ],
});

test('remove iife: report: iife', (t) => {
    t.report('iife', 'Avoid IIFE');
    t.end();
});

test('remove iife: transform: iife', (t) => {
    t.transform('iife');
    t.end();
});

test('remove iife: transform: arrow', (t) => {
    t.transform('arrow');
    t.end();
});

test('remove iife: transform: else', (t) => {
    t.transform('else');
    t.end();
});

test('remove iife: no transform: sequence', (t) => {
    t.noTransform('sequence');
    t.end();
});

test('remove iife: no transform: return', (t) => {
    t.noTransform('return');
    t.end();
});

test('remove iife: no transform: not-used', (t) => {
    t.noTransform('not-used');
    t.end();
});

test('remove iife: no transform: var', (t) => {
    t.noTransform('var');
    t.end();
});
