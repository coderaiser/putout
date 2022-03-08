'use strict';

const {createTest} = require('@putout/test');
const convertQuotesToBacktics = require('..');

const test = createTest(__dirname, {
    'convert-quotes-to-backtics': convertQuotesToBacktics,
});

test('plugin-convert-quotes-to-backtics: report', (t) => {
    t.report('quotes', 'Use backticks instead of quotes');
    t.end();
});

test('plugin-convert-quotes-to-backtics: transform', (t) => {
    t.transform('quotes');
    t.end();
});

test('plugin-convert-quotes-to-backtics: transform: newline', (t) => {
    t.transform('newline');
    t.end();
});

test('plugin-convert-quotes-to-backtics: transform: backslash', (t) => {
    t.transform('backslash');
    t.end();
});

