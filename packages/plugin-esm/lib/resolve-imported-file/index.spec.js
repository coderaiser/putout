import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['resolve-imported-file', plugin],
    ],
});

test('esm: resolve-imported-file: report', (t) => {
    t.report('resolve-imported-file', `Resolve import source: './a' -> './a.js'`);
    t.end();
});

test('esm: resolve-imported-file: transform', (t) => {
    t.transform('resolve-imported-file');
    t.end();
});

test('esm: resolve-imported-file: no report: no-package', (t) => {
    t.noReport('no-package');
    t.end();
});

test('esm: resolve-imported-file: transform: dynamic', (t) => {
    t.transform('dynamic');
    t.end();
});
