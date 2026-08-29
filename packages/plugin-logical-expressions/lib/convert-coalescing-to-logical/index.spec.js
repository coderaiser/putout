import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-coalescing-to-logical', plugin],
    ],
});

test('logical-expressions: convert-coalescing-to-logical: report', (t) => {
    t.report('convert-coalescing-to-logical', `Use '||' instead of '??'`);
    t.end();
});

test('logical-expressions: convert-coalescing-to-logical: transform', (t) => {
    t.transform('convert-coalescing-to-logical');
    t.end();
});
