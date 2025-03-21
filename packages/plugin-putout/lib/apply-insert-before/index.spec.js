import {createTest} from '@putout/test';
import * as convert from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/apply-insert-before', convert],
    ],
});

test('plugin-tape: apply-insert-before: report', (t) => {
    t.report('apply-insert-before', `Use 'insertBefore(a, b)' instead of 'a.insertBefore(b)'`);
    t.end();
});

test('plugin-tape: apply-insert-before', (t) => {
    t.transform('apply-insert-before');
    t.end();
});
