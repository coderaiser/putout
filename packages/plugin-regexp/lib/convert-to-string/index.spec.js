import {createTest} from '@putout/test';
import * as convertToString from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['regexp/convert-to-string', convertToString],
    ],
});

test('plugin-regexp/convert-to-string: report: replace', (t) => {
    t.report('replace', 'String should be used instead of RegExp');
    t.end();
});

test('plugin-regexp/convert-to-string: transform: replace', (t) => {
    t.transform('replace');
    t.end();
});

test('plugin-regexp/convert-to-string: transform: replace-all', (t) => {
    t.transform('replace-all');
    t.end();
});

test('plugin-regexp/convert-to-string: no transform: replace-all-flags', (t) => {
    t.noTransform('replace-all-flags');
    t.end();
});

test('plugin-regexp/convert-to-string: no transform: replace-flags', (t) => {
    t.noTransform('replace-flags');
    t.end();
});

test('plugin-regexp/simplify: disjunction', (t) => {
    t.noTransform('disjunction');
    t.end();
});

test('plugin-regexp/simplify: meta', (t) => {
    t.noTransform('meta');
    t.end();
});
