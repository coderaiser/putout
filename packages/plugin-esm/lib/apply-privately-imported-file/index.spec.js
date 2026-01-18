import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-privately-imported-file', plugin],
    ],
});

test('esm: apply-privately-imported-file: report', (t) => {
    t.report('apply-privately-imported-file', `Apply privately imported source: '../is.js' -> '#is'`);
    t.end();
});

test('esm: apply-privately-imported-file: transform', (t) => {
    t.transform('apply-privately-imported-file');
    t.end();
});

test('esm: apply-privately-imported-file: transform: cache', (t) => {
    t.transform('cache');
    t.end();
});

test('esm: apply-privately-imported-file: transform: first-no-private', (t) => {
    t.transform('first-no-private');
    t.end();
});

test('esm: apply-privately-imported-file: no report: broken-package', (t) => {
    t.noReport('broken-package');
    t.end();
});

test('esm: apply-privately-imported-file: no report: no-imports', (t) => {
    t.noReport('no-imports');
    t.end();
});

test('esm: apply-privately-imported-file: no report: no-package', (t) => {
    t.noReport('no-package');
    t.end();
});

test('esm: apply-privately-imported-file: transform: same-directory', (t) => {
    t.transform('same-directory');
    t.end();
});

test('esm: apply-privately-imported-file: transform: no-default', (t) => {
    t.transform('no-default');
    t.end();
});
