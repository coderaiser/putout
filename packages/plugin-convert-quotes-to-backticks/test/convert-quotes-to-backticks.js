'use strict';

const {createTest} = require('@putout/test');
const convertQuotesToBacktics = require('..');

const test = createTest(__dirname, {
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

test('plugin-convert-quotes-to-backtics: no report: object-key', (t) => {
    t.noReport('object-key');
    t.end();
});

test('plugin-convert-quotes-to-backtics: transform: backslash', (t) => {
    t.transform('backslash');
    t.end();
});
