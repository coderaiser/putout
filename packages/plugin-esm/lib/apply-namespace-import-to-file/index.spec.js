import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-namespace-import-to-file', plugin],
    ],
});

test('esm: apply-namespace-import-to-file: report', (t) => {
    t.report('apply-namespace-import-to-file', `Use 'import * as dotdot from './b/index.js' in '/lib/index.js'`);
    t.end();
});

test('esm: apply-namespace-import-to-file: transform', (t) => {
    t.transform('apply-namespace-import-to-file');
    t.end();
});

test('esm: apply-namespace-import-to-file: transform: private', (t) => {
    t.transform('private');
    t.end();
});

test('esm: apply-namespace-import-to-file: no report: has-export-default', (t) => {
    t.noReport('has-export-default');
    t.end();
});

test('esm: apply-namespace-import-to-file: no report: commonjs', (t) => {
    t.noReport('commonjs');
    t.end();
});

test('esm: apply-namespace-import-to-file: no report: invalid', (t) => {
    t.noReport('invalid');
    t.end();
});
