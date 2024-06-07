import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['convert-return-to-sequence-expression', plugin],
    ],
});

test('minify: convert-return-to-sequence-expression: report', (t) => {
    t.report('convert-return-to-sequence-expression', 'Convert return to sequence expression');
    t.end();
});

test('minify: convert-return-to-sequence-expression: transform', (t) => {
    t.transform('convert-return-to-sequence-expression');
    t.end();
});
