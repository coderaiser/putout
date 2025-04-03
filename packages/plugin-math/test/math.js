import {createTest} from '@putout/test';
import * as math from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['math', math],
    ],
});

test('plugin-math: transform: convert-sqrt-to-hypot', (t) => {
    t.transform('convert-sqrt-to-hypot');
    t.end();
});

test('plugin-math: transform: apply-exponentiation', (t) => {
    t.transform('apply-exponentiation');
    t.end();
});

test('plugin-math: transform: apply-multiplication', (t) => {
    t.transform('apply-multiplication');
    t.end();
});

test('plugin-math: transform: apply-numeric-separators', (t) => {
    t.transform('apply-numeric-separators');
    t.end();
});

test('plugin-math: transform: declare', (t) => {
    t.transform('declare');
    t.end();
});

test('plugin-math: transform: remove-unchanged-zero-declarations', (t) => {
    t.transform('remove-unchanged-zero-declarations');
    t.end();
});
