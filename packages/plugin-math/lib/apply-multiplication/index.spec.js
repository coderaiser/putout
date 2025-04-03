import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['math/apply-multiplication', plugin],
    ],
});

test('plugin-math: apply-multiplication: report: imul', (t) => {
    t.report('imul', `Use '*' instead of 'Math.imul()'`);
    t.end();
});

test('plugin-math: apply-multiplication: transform: imul', (t) => {
    t.transform('imul');
    t.end();
});
