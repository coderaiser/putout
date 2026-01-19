import {createTest} from '@putout/test';
import * as removeOnly from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/remove-only', removeOnly],
    ],
});

test('test: rule: remove-only: report: only', (t) => {
    t.report('only', `Remove 'test.only'`);
    t.end();
});

test('test: rule: remove-only: transform: only', (t) => {
    t.transform('only');
    t.end();
});

test('test: rule: remove-only: transform: options', (t) => {
    t.transform('options');
    t.end();
});

test('test: rule: remove-only: transform: iife', (t) => {
    t.transform('iife');
    t.end();
});

test('test: rule: remove-only: transform: any-name', (t) => {
    t.transform('any-name');
    t.end();
});
