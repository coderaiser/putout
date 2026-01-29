import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-named-import-to-file', plugin],
    ],
});

test('esm: apply-named-import-to-file: report', (t) => {
    t.report('apply-named-import-to-file', `Use 'import {dotdot} from './b/index.js' in '/lib/index.js'`);
    t.end();
});

test('esm: apply-named-import-to-file: transform', (t) => {
    t.transform('apply-named-import-to-file');
    t.end();
});

test('esm: apply-named-import-to-file: transform: private', (t) => {
    t.transform('private');
    t.end();
});

test('esm: apply-named-import-to-file: no report: has-export-default', (t) => {
    t.noReport('has-export-default');
    t.end();
});

test('esm: apply-named-import-to-file: no report: commonjs', (t) => {
    t.noReport('commonjs');
    t.end();
});

test('esm: apply-named-import-to-file: no report: invalid', (t) => {
    t.noReport('invalid');
    t.end();
});

test('esm: apply-named-import-to-file: no report: different-name', (t) => {
    t.noReport('different-name');
    t.end();
});
