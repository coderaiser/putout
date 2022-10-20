'use strict';

const {createTest} = require('@putout/test');
const convertMathPow = require('.');

const test = createTest(__dirname, {
    'apply-exponentiation': convertMathPow,
});

test('plugin-math: apply-exponentiation: report', (t) => {
    t.report('pow', `Use operator '**' instead of 'Math.pow()'`);
    t.end();
});

test('plugin-math: apply-exponentiation: transform', (t) => {
    t.transform('pow');
    t.end();
});

test('plugin-math: apply-exponentiation: transform: identifier', (t) => {
    t.transform('identifier');
    t.end();
});

test('plugin-math: apply-exponentiation: transform: duplicate', (t) => {
    t.transform('duplicate');
    t.end();
});

