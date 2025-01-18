'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['simplify-ternary/value', plugin],
    ],
});

test('plugin-simplify-ternary: value: report: ternary', (t) => {
    t.report('ternary', 'Simplify ternary');
    t.end();
});

test('plugin-simplify-ternary: value: transform: ternary', (t) => {
    t.transform('ternary');
    t.end();
});

test('plugin-simplify-ternary: value: transform: optional', (t) => {
    t.transform('optional');
    t.end();
});

test('plugin-simplify-ternary: value: false', (t) => {
    t.transform('false');
    t.end();
});

test('plugin-simplify-ternary: value: return', (t) => {
    t.noTransform('return');
    t.end();
});

test('plugin-simplify-ternary: value: no transform: jsx', (t) => {
    t.noTransform('jsx');
    t.end();
});
