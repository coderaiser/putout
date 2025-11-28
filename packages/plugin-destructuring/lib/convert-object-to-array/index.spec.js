import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-object-to-array', plugin],
    ],
});

test('apply-destructuring: convert-object-to-array: report', (t) => {
    t.report('convert-object-to-array', `Use array destructuring instead of object destructuring`);
    t.end();
});

test('apply-destructuring: convert-object-to-array: transform', (t) => {
    t.transform('convert-object-to-array');
    t.end();
});

test('apply-destructuring: convert-object-to-array: no report: no-indexes', (t) => {
    t.noReport('no-indexes');
    t.end();
});
