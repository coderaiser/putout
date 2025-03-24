import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-return', plugin],
    ],
});

test('putout-config: apply-return: report', (t) => {
    t.report('apply-return', `Rename property: 'apply-early-return' -> 'return/apply-early'`);
    t.end();
});

test('putout-config: apply-return: transform', (t) => {
    t.transform('apply-return');
    t.end();
});
