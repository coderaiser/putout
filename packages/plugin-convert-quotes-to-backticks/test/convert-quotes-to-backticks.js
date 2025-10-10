import {createTest} from '@putout/test';
import * as convertQuotesToBackticks from '../lib/convert-quotes-to-backticks.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-quotes-to-backticks', convertQuotesToBackticks],
    ],
});

test('plugin-convert-quotes-to-backticks: report: quotes', (t) => {
    t.report('quotes', 'Use backticks instead of quotes');
    t.end();
});

test('plugin-convert-quotes-to-backticks: transform: quotes', (t) => {
    t.transform('quotes');
    t.end();
});

test('plugin-convert-quotes-to-backticks: transform: newline', (t) => {
    t.transform('newline');
    t.end();
});

test('plugin-convert-quotes-to-backticks: no report: variables', (t) => {
    t.noReport('variables');
    t.end();
});

test('plugin-convert-quotes-to-backticks: transform: object-key', (t) => {
    t.transform('object-key');
    t.end();
});

test('plugin-convert-quotes-to-backticks: transform: backslash', (t) => {
    t.transform('backslash');
    t.end();
});

test('plugin-convert-quotes-to-backticks: no report: backtick', (t) => {
    t.noReport('backtick');
    t.end();
});
