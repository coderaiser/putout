import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-assignment', plugin],
    ],
});

test('putout-config: apply-assignment: report', (t) => {
    t.report('apply-assignment', `Rename property: 'split-assignment-expressions' -> 'assignment/split'`);
    t.end();
});

test('putout-config: apply-assignment: transform', (t) => {
    t.transform('apply-assignment');
    t.end();
});
