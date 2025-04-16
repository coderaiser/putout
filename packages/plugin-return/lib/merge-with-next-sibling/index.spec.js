import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['merge-with-next-sibling', plugin],
    ],
});

test('putout: merge-with-next-sibling: report', (t) => {
    t.report('merge-with-next-sibling', `Merge 'return' with next sibling`);
    t.end();
});

test('putout: merge-with-next-sibling: transform', (t) => {
    t.transform('merge-with-next-sibling');
    t.end();
});
