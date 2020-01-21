'use strict';

const test = require('@putout/test')(__dirname, {
    'convert-math-pow': require('..'),
});

test('plugin-convert-math-pow: report', (t) => {
    t.report('throw', '"throw" should be used without body');
    t.end();
});

test('plugin-convert-math-pow: transform', (t) => {
    t.transform('throw');
    t.end();
});

