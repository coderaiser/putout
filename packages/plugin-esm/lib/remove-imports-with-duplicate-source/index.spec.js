import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-imports-with-duplicate-source', plugin],
    ],
});

test('esm: remove-imports-with-duplicate-source: report', (t) => {
    t.report('remove-imports-with-duplicate-source', `Avoid 'imports' with duplicate 'source': 's'`);
    t.end();
});

test('esm: remove-imports-with-duplicate-source: transform', (t) => {
    t.transform('remove-imports-with-duplicate-source');
    t.end();
});

test('esm: remove-imports-with-duplicate-source: transform: namespace-first', (t) => {
    t.transform('namespace-first');
    t.end();
});
