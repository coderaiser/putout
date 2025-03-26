import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-index-to-import', plugin],
    ],
});

test('packages: add-index-to-import: report: add-index-to-import', (t) => {
    t.report('add-index-to-import', `Add 'index.js' to nested import`);
    t.end();
});

test('packages: add-index-to-import: transform: add-index-to-import', (t) => {
    t.transform('add-index-to-import');
    t.end();
});

test('packages: add-index-to-import: no report: cjs', (t) => {
    t.noReport('cjs');
    t.end();
});
