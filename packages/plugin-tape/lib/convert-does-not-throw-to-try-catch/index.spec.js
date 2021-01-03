'use strict';

const convert = require('.');
const test = require('@putout/test')(__dirname, {
    'tape/convert-does-not-throw-to-try-catch': convert,
});

test('plugin-tape: convert-does-not-throw-to-try-catch: report', (t) => {
    t.report('does-not-throw', 'try-catch should be used instead of t.doesNotThrow');
    t.end();
});

test('plugin-tape: convert-does-not-throw-to-try-catch', (t) => {
    t.transform('does-not-throw');
    t.end();
});

