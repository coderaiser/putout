import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-loop-condition', plugin],
    ],
});

test('conditions: remove-useless-loop-condition: report', (t) => {
    t.report('remove-useless-loop-condition', `Avoid useless loop condition`);
    t.end();
});

test('conditions: remove-useless-loop-condition: transform', (t) => {
    t.transform('remove-useless-loop-condition');
    t.end();
});
