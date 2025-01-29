'use strict';

const {createTest} = require('@putout/test');
const returnPlugin = require('..');

const test = createTest(__dirname, {
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
