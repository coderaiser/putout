'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['tape/convert-does-not-throw-to-try-catch', convert],
    ],
});

test('plugin-tape: convert-does-not-throw-to-try-catch: report: does-not-throw', (t) => {
    t.report('does-not-throw', 'try-catch should be used instead of t.doesNotThrow');
    t.end();
});

test('plugin-tape: does-not-throw', (t) => {
    t.transform('does-not-throw');
    t.end();
});
