import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['merge-if-with-else', plugin],
    ],
});

test('conditions: merge-if-with-else: report', (t) => {
    t.report('merge-if-with-else', `Merge 'if' with 'else' when the body is the same`);
    t.end();
});

test('conditions: merge-if-with-else: transform', (t) => {
    t.transform('merge-if-with-else');
    t.end();
});
