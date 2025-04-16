import {createTest} from '@putout/test';
import * as returnPlugin from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['return', returnPlugin],
    ],
});

test('plugin-return: transform: apply-early', (t) => {
    t.transform('apply-early');
    t.end();
});

test('plugin-return: transform: convert-from-continue', (t) => {
    t.transform('convert-from-continue');
    t.end();
});

test('plugin-return: transform: convert-from-break', (t) => {
    t.transform('convert-from-break');
    t.end();
});

test('plugin-return: transform: merge-with-next-sibling', (t) => {
    t.transform('merge-with-next-sibling');
    t.end();
});

test('plugin-return: transform: simplify-boolean', (t) => {
    t.transform('simplify-boolean');
    t.end();
});

test('plugin-return: transform: remove-useless', (t) => {
    t.transform('remove-useless');
    t.end();
});
