import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-early-return', plugin],
    ],
});

test('conditions: apply-early-return: report', (t) => {
    t.report('apply-early-return', `Use 'early return' instead of 'else'`);
    t.end();
});

test('conditions: apply-early-return: transform', (t) => {
    t.transform('apply-early-return');
    t.end();
});
