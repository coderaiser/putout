'use strict';

const convert = require('..');
const test = require('@putout/test')(__dirname, {
    'convert-tape-to-supertape': convert
});

test('plugin-convert-tape-to-supertape: message', (t) => {
    t.messages('try-to-tape', [
        '"tryTo" should not be declared',
        "tryTo should not be called",
        '"supertape" should be used instead of "tape"',
    ]);
    
    t.end();
});

test('plugin-convert-tape-to-supertape: try-to-tape', (t) => {
    t.transforms('try-to-tape');
    t.end();
});

