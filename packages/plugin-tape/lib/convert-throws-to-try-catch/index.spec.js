'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');
const test = createTest(__dirname, {
    'tape/convert-throws-to-try-catch': convert,
});

test('plugin-tape: convert-throws-to-try-catch: report', (t) => {
    t.report('throws', 'try-catch should be used instead of t.throws');
    t.end();
});

test('plugin-tape: convert-throws-to-try-catch', (t) => {
    t.transform('throws');
    t.end();
});

test('plugin-tape: convert-throws-to-try-catch: couple tests', (t) => {
    t.transform('throws-couple');
    t.end();
});

test('plugin-tape: convert-throws-to-try-catch: declared try-catch', (t) => {
    t.transform('throws-declared');
    t.end();
});

test('plugin-tape: convert-throws-to-try-catch: member expression', (t) => {
    t.transform('member-expression');
    t.end();
});

test('plugin-tape: convert-throws-to-try-catch: no error', (t) => {
    t.transform('no-error');
    t.end();
});
