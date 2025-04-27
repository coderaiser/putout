import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['merge-declaration-with-export', plugin],
    ],
});

test('esm: merge-declaration-with-export: report', (t) => {
    t.report('merge-declaration-with-export', `Use 'if condition' instead of 'ternary expression'`);
    t.end();
});

test('esm: merge-declaration-with-export: transform', (t) => {
    t.transform('merge-declaration-with-export');
    t.end();
});

test('esm: merge-declaration-with-export: no report: import', (t) => {
    t.noReport('import');
    t.end();
});
