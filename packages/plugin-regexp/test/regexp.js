import {createTest} from '@putout/test';
import * as regexp from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['regexp', regexp],
    ],
});

test('plugin-regexp: optimize: report: regexp', (t) => {
    t.report('regexp', 'RegExp /(ab|ab)/ can be optimized to /(ab)/');
    t.end();
});

test('plugin-regexp: apply-literal-notation: transform: regexp', (t) => {
    t.transform('regexp');
    t.end();
});

test('plugin-regexp: convert-to-string: transform: replace', (t) => {
    t.transform('replace');
    t.end();
});

test('plugin-regexp: convert-replace-to-replace-all: transform: replace-global', (t) => {
    t.transform('replace-global');
    t.end();
});

test('plugin-regexp: remove-useless-group: transform', (t) => {
    t.transform('remove-useless-group');
    t.end();
});

test('plugin-regexp: remove-useless-regexp: transform', (t) => {
    t.transform('remove-useless-regexp');
    t.end();
});

test('plugin-regexp: transform: apply-starts-with', (t) => {
    t.transform('apply-starts-with');
    t.end();
});

test('plugin-regexp: transform: apply-ends-with', (t) => {
    t.transform('apply-ends-with');
    t.end();
});
