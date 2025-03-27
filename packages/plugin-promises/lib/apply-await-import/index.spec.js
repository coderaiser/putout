import {createTest} from '@putout/test';
import * as awaitImport from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['await-import', awaitImport],
    ],
});

test('plugin-apply-await-import: report: await-import', (t) => {
    t.report('await-import', `Use 'await' near 'import' call`);
    t.end();
});

test('plugin-apply-await-import: transform: await-import', (t) => {
    t.transform('await-import');
    t.end();
});

test('plugin-apply-await-import: no transform: not-declaration', (t) => {
    t.noTransform('not-declaration');
    t.end();
});
