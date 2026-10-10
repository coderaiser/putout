import {createTest} from '@putout/test';
import * as plugin from '../lib/apply-to-sorted.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-to-sorted', plugin],
    ],
});

test('putout: apply-to-sorted: report', (t) => {
    t.report('apply-to-sorted', `Use 'toSorted()' instead of '...sort()'`);
    t.end();
});

test('putout: apply-to-sorted: transform', (t) => {
    t.transform('apply-to-sorted');
    t.end();
});
