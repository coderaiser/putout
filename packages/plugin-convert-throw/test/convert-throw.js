'use strict';

const convertThrow = require('..');

const test = require('@putout/test')(__dirname, {
    'convert-throw': convertThrow,
});

test('plugin-convert-throw: report', (t) => {
    t.report('throw', '"throw" should be used without body');
    t.end();
});

test('plugin-convert-throw: transform', (t) => {
    t.transform('throw');
    t.end();
});
