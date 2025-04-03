import {createTest} from '@putout/test';
import * as convertMathPow from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-exponentiation', convertMathPow],
    ],
});

test('plugin-math: apply-exponentiation: report: pow', (t) => {
    t.report('pow', `Use operator '**' instead of 'Math.pow()'`);
    t.end();
});

test('plugin-math: apply-exponentiation: transform: pow', (t) => {
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
