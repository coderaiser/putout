import {createTest} from '@putout/test';
import * as convertBitwiseToLogical from './index.js';

const test = createTest(import.meta.url, {
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
