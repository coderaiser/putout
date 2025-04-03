import {createTest} from '@putout/test';
import * as convertMathPow from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['math/convert-sqrt-to-hypot', convertMathPow],
    ],
});

test('plugin-math: convert-sqrt-to-hypot: report: sqrt', (t) => {
    t.report('sqrt', `Use 'Math.hypot()' instead of 'Math.sqrt()'`);
    t.end();
});

test('plugin-math: convert-sqrt-to-hypot: transform: sqrt', (t) => {
    t.transform('sqrt');
    t.end();
});
