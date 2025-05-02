import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['simplify-ternary/spread', plugin],
    ],
});

test('plugin-simplify-ternary: spread: report', (t) => {
    t.report('spread', 'Simplify ternary');
    t.end();
});

test('plugin-simplify-ternary: spread: transform', (t) => {
    t.transform('spread');
    t.end();
});
