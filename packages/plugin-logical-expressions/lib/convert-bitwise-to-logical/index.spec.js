'use strict';

const {createTest} = require('@putout/test');
const convertBitwiseToLogical = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['convert-bitwise-to-logical', convertBitwiseToLogical],
    ],
});

test('plugin-convert-bitwise-to-logical: report: bitwise', (t) => {
    t.report('bitwise', 'Avoid using logical operator as operand of bitwise operator');
    t.end();
});

test('plugin-convert-bitwise-to-logical: transform: bitwise', (t) => {
    t.transform('bitwise');
    t.end();
});
