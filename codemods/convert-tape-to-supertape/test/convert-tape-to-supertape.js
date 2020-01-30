'use strict';

const convert = require('..');
const test = require('@putout/test')(__dirname, {
    'convert-tape-to-supertape': convert,
});

test('plugin-convert-tape-to-supertape: report: try-to', (t) => {
    t.report('try-to', '"supertape" should be used');
    t.end();
});

test('plugin-convert-tape-to-supertape: try-to', (t) => {
    t.transform('try-to');
    t.end();
});

test('plugin-convert-tape-to-supertape: try-to-tape', (t) => {
    t.transform('try-to-tape');
    t.end();
});

