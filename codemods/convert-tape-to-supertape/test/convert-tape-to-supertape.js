'use strict';

const convert = require('..');
const test = require('@putout/test')(__dirname, {
    'convert-tape-to-supertape': convert,
});

test('plugin-convert-tape-to-supertape: report: try-to', (t) => {
    t.report('try-to', [
        '"tryTo" should not be declared',
        'tryTo should not be called',
        '"supertape" should be used instead of "tape"',
    ]);
    
    t.end();
});

test('plugin-convert-tape-to-supertape: report: try-to-tape', (t) => {
    t.report('try-to-tape', [
        '"tryToTape" should not be declared',
        'tryToTape should not be called',
        '"supertape" should be used instead of "tape"',
    ]);
    
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

