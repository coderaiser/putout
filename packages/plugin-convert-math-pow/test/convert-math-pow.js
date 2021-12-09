'use strict';

const convertMathPow = require('..');

const test = require('@putout/test')(__dirname, {
    'convert-math-pow': convertMathPow,
});

test('plugin-convert-math-pow: report', (t) => {
    t.report('pow', 'operator "**" should be used instead of Math.pow');
    t.end();
});

test('plugin-convert-math-pow: transform', (t) => {
    t.transform('pow');
    t.end();
});

test('plugin-convert-math-pow: transform: identifier', (t) => {
    t.transform('identifier');
    t.end();
});

