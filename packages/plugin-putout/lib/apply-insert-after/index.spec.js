import {createTest} from '@putout/test';
import * as convert from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/apply-insert-after', convert],
    ],
});

test('plugin-tape: apply-insert-after: report', (t) => {
    t.report('apply-insert-after', `Use 'insertAfter(a, b)' instead of 'a.insertAfter(b)'`);
    t.end();
});

test('plugin-tape: apply-insert-after', (t) => {
    t.transform('apply-insert-after');
    t.end();
});
