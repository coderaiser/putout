import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['merge-export-declarations', plugin],
    ],
});

test('esm: merge-export-declarations: report', (t) => {
    t.report('merge-export-declarations', `Merge export declarations`);
    t.end();
});

test('esm: merge-export-declarations: transform', (t) => {
    t.transform('merge-export-declarations');
    t.end();
});

test('esm: merge-export-declarations: transform: same-sources', (t) => {
    t.transform('same-sources');
    t.end();
});

test('esm: merge-export-declarations: no report: different-sources', (t) => {
    t.noReport('different-sources');
    t.end();
});
