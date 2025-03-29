import {createTest} from '@putout/test';
import * as removeOnly from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/remove-only', removeOnly],
    ],
});

test('plugin-remove-only: report: only', (t) => {
    t.report('only', `Remove 'test.only'`);
    t.end();
});

test('plugin-remove-only: transform: only', (t) => {
    t.transform('only');
    t.end();
});

test('plugin-remove-only: transform: options', (t) => {
    t.transform('options');
    t.end();
});

test('plugin-remove-only: transform: iife', (t) => {
    t.transform('iife');
    t.end();
});

test('plugin-remove-only: transform: other-name', (t) => {
    t.transform('other-name');
    t.end();
});

test('plugin-remove-only: no report: member', (t) => {
    t.noReport('member');
    t.end();
});
