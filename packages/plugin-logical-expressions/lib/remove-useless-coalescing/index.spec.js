import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-coalescing', plugin],
    ],
});

test('logical-expressions: remove-useless-coalescing: report', (t) => {
    t.report('remove-useless-coalescing', `Avoid useless '??'`);
    t.end();
});

test('logical-expressions: remove-useless-coalescing: transform', (t) => {
    t.transform('remove-useless-coalescing');
    t.end();
});
