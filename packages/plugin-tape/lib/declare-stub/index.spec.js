'use strict';

const convert = require('.');
const test = require('@putout/test')(__dirname, {
    'tape/declare-stub': convert,
});

test('plugin-tape: declare-stub: report', (t) => {
    t.report('stub', '"stub" should be declared');
    t.end();
});

test('plugin-tape: declare-stub', (t) => {
    t.transform('stub');
    t.end();
});

test('plugin-tape: declare-stub: test-exists', (t) => {
    t.transform('test-exists');
    t.end();
});

test('plugin-tape: declare-stub: transform: not tape', (t) => {
    t.transform('not-tape');
    t.end();
});

test('plugin-tape: declare-stub: no report after transform: not tape', (t) => {
    t.noReportAfterTransform('not-tape');
    t.end();
});

