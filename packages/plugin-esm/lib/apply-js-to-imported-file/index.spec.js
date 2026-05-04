import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-js-to-imported-file', plugin],
    ],
});

test('esm: apply-js-to-imported-file: report', (t) => {
    t.report('apply-js-to-imported-file', `Apply 'js' to imported source: '../is.mjs' -> '../is.js'`);
    t.end();
});

test('esm: apply-js-to-imported-file: transform', (t) => {
    t.transform('apply-js-to-imported-file');
    t.end();
});

test('esm: apply-js-to-imported-file: transform: cjs', (t) => {
    t.transform('cjs');
    t.end();
});

test('esm: apply-js-to-imported-file: transform: cache', (t) => {
    t.transform('cache');
    t.end();
});

test('esm: apply-js-to-imported-file: no report: broken-package', (t) => {
    t.noReport('broken-package');
    t.end();
});

test('esm: apply-js-to-imported-file: no report: no-package', (t) => {
    t.noReport('no-package');
    t.end();
});

test('esm: apply-js-to-imported-file: no report: invalid', (t) => {
    t.noReport('invalid');
    t.end();
});

test('esm: apply-js-to-imported-file: transform: dynamic', (t) => {
    t.transform('dynamic');
    t.end();
});
