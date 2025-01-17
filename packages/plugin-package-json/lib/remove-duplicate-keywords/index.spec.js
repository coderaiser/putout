import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-duplicate-keywords', plugin],
    ],
});

test('package-json: remove-duplicate-keywords: report', (t) => {
    t.report('remove-duplicate-keywords', `Remove duplicate keywords`);
    t.end();
});

test('package-json: remove-duplicate-keywords: transform', (t) => {
    t.transform('remove-duplicate-keywords');
    t.end();
});

test('package-json: remove-duplicate-keywords: transform: second', (t) => {
    t.transform('second');
    t.end();
});
