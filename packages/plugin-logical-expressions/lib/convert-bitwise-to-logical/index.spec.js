'use strict';

const {createTest} = require('@putout/test');
const convertBitwiseToLogical = require('.');

const test = createTest(__dirname, {
    'convert-bitwise-to-logical': convertBitwiseToLogical,
});

test('plugin-convert-bitwise-to-logical: report', (t) => {
    t.report('bitwise', 'Avoid using logical operator as operand of bitwise operator');
    t.end();
});

test('plugin-convert-bitwise-to-logical: transform', (t) => {
    t.transform('bitwise');
    t.end();
});

