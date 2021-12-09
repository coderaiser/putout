'use strict';

const convertQuotesToBacktics = require('..');

const test = require('@putout/test')(__dirname, {
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

