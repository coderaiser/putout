import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-destructuring', plugin],
    ],
});

test('putout-config: apply-destructuring: report', (t) => {
    t.report('apply-destructuring', `Rename property: 'apply-destructuring' -> 'destructuring'`);
    t.end();
});

test('putout-config: apply-destructuring: transform', (t) => {
    t.transform('apply-destructuring');
    t.end();
});
