'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');
const test = createTest(__dirname, {
    'tape/convert-called-with-to-called-with-no-args': convert,
});

test('plugin-tape: convert-called-with-to-called-with-no-args: report: try-to', (t) => {
    t.report('no-args', '"calledWithNoArgs" should be used when arguments are absent');
    t.end();
});

test('plugin-tape: convert-called-with-to-called-with-no-args: no args', (t) => {
    t.transform('no-args');
    t.end();
});

test('plugin-tape: convert-called-with-to-called-with-no-args: empty array', (t) => {
    t.transform('empty-array');
    t.end();
});

test('plugin-tape: convert-called-with-to-called-with-no-args: message', (t) => {
    t.transform('message');
    t.end();
});

