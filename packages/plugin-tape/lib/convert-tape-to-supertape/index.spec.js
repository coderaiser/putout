'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');
const test = createTest(__dirname, {
    'tape/convert-tape-to-supertape': convert,
});

test('plugin-tape: convert-tape-to-supertape: report: try-to', (t) => {
    t.report('try-to', '"supertape" should be used');
    t.end();
});

test('plugin-tape: convert-tape-to-supertape: try-to', (t) => {
    t.transform('try-to');
    t.end();
});

test('plugin-tape: convert-tape-to-supertape: try-to-tape', (t) => {
    t.transform('try-to-tape');
    t.end();
});

test('plugin-tape: convert-tape-to-supertape: try-to-tape: tape', (t) => {
    t.transform('tape');
    t.end();
});

