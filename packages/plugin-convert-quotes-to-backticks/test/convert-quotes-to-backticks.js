import {createTest} from '@putout/test';
import * as convertQuotesToBacktics from '../lib/convert-quotes-to-backticks.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-quotes-to-backtics', convertQuotesToBacktics],
    ],
});

test('plugin-convert-quotes-to-backtics: report: quotes', (t) => {
    t.report('quotes', 'Use backticks instead of quotes');
    t.end();
});

test('plugin-convert-quotes-to-backtics: transform: quotes', (t) => {
    t.transform('quotes');
    t.end();
});

test('plugin-convert-quotes-to-backtics: transform: newline', (t) => {
    t.transform('newline');
    t.end();
});

test('plugin-convert-quotes-to-backtics: no report: variables', (t) => {
    t.noReport('variables');
    t.end();
});

test('plugin-convert-quotes-to-backtics: transform: object-key', (t) => {
    t.transform('object-key');
    t.end();
});

test('plugin-convert-quotes-to-backtics: transform: backslash', (t) => {
    t.transform('backslash');
    t.end();
});

test('plugin-convert-quotes-to-backtics: no report: backtick', (t) => {
    t.noReport('backtick');
    t.end();
});
