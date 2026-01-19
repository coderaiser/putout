import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-js-imported-file', plugin],
    ],
});

test('esm: apply-js-imported-file: report', (t) => {
    t.report('apply-js-imported-file', `Apply 'js' imported source: '../is.mjs' -> '../is.js'`);
    t.end();
});

test('esm: apply-js-imported-file: transform', (t) => {
    t.transform('apply-js-imported-file');
    t.end();
});

test('esm: apply-js-imported-file: transform: cjs', (t) => {
    t.transform('cjs');
    t.end();
});

test('esm: apply-js-imported-file: transform: cache', (t) => {
    t.transform('cache');
    t.end();
});

test('esm: apply-js-imported-file: no report: broken-package', (t) => {
    t.noReport('broken-package');
    t.end();
});

test('esm: apply-js-imported-file: no report: no-package', (t) => {
    t.noReport('no-package');
    t.end();
});

test('esm: apply-js-imported-file: no report: invalid', (t) => {
    t.noReport('invalid');
    t.end();
});
