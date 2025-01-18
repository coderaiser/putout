'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['tape/convert-throws-to-try-catch', convert],
    ],
});

test('plugin-tape: convert-throws-to-try-catch: report: throws', (t) => {
    t.report('throws', 'try-catch should be used instead of t.throws');
    t.end();
});

test('plugin-tape: throws', (t) => {
    t.transform('throws');
    t.end();
});

test('plugin-tape: convert-throws-to-try-catch: throws-couple', (t) => {
    t.transform('throws-couple');
    t.end();
});

test('plugin-tape: convert-throws-to-try-catch: throws-declared', (t) => {
    t.transform('throws-declared');
    t.end();
});

test('plugin-tape: convert-throws-to-try-catch: member-expression', (t) => {
    t.transform('member-expression');
    t.end();
});

test('plugin-tape: convert-throws-to-try-catch: no-error', (t) => {
    t.transform('no-error');
    t.end();
});
