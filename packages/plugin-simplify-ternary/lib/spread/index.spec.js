'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    'simplify-ternary/spread': plugin,
});

test('plugin-simplify-ternary: spread: report', (t) => {
    t.report('spread', 'Simplify ternary');
    t.end();
});

test('plugin-simplify-ternary: spread: transform', (t) => {
    t.transform('spread');
    t.end();
});

