'use strict';

const {createTest} = require('@putout/test');
const convertMathPow = require('..');

const test = createTest(__dirname, {
    'convert-imul-to-multiplication': convertMathPow,
});

test('plugin-convert-imul-to-multiplication: report', (t) => {
    t.report('imul', `Use '*' instead of 'Math.imul()'`);
    t.end();
});

test('plugin-convert-imul-to-multiplication: transform', (t) => {
    t.transform('imul');
    t.end();
});

