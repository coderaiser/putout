import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-math', plugin],
    ],
});

test('putout-config: apply-math: report', (t) => {
    t.report('apply-math', `Rename property: 'convert-math-pow' -> 'math/apply-exponential'`);
    t.end();
});

test('putout-config: apply-math: transform', (t) => {
    t.transform('apply-math');
    t.end();
});
