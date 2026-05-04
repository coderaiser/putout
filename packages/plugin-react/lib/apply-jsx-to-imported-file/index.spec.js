import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-jsx-to-imported-file', plugin],
    ],
});

test('react: apply-jsx-to-imported-file: report', (t) => {
    t.report('apply-jsx-to-imported-file', `Apply 'jsx' to imported source: '../is.js' -> '../is.jsx'`);
    t.end();
});

test('react: apply-jsx-to-imported-file: transform', (t) => {
    t.transform('apply-jsx-to-imported-file');
    t.end();
});

test('react: apply-jsx-to-imported-file: no report: cjs', (t) => {
    t.noReport('cjs');
    t.end();
});

test('react: apply-jsx-to-imported-file: no report: broken-package', (t) => {
    t.noReport('broken-package');
    t.end();
});

test('react: apply-jsx-to-imported-file: no report: no-package', (t) => {
    t.noReport('no-package');
    t.end();
});

test('react: apply-jsx-to-imported-file: no report: invalid', (t) => {
    t.noReport('invalid');
    t.end();
});

test('react: apply-jsx-to-imported-file: no report: no-jsx', (t) => {
    t.noReport('no-jsx');
    t.end();
});

test('react: apply-jsx-to-imported-file: transform: dynamic', (t) => {
    t.transform('dynamic');
    t.end();
});
