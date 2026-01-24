import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-duplicate', plugin],
    ],
});

test('arguments: remove-duplicate: report', (t) => {
    t.report('remove-duplicate', `Avoid duplicate parameter 'a'`);
    t.end();
});

test('arguments: remove-duplicate: transform', (t) => {
    t.transform('remove-duplicate');
    t.end();
});
