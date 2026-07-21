import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-number', plugin],
    ],
});

test('types: apply-number: report', (t) => {
    t.report('apply-number', `Use 'Number()' instead of 'ternary expression'`);
    t.end();
});

test('types: apply-number: transform', (t) => {
    t.transform('apply-number');
    t.end();
});
