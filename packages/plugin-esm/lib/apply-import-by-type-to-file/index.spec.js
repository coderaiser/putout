import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-import-by-type-to-file', plugin],
    ],
});

test('esm: apply-import-by-type-to-file: report', (t) => {
    t.report('apply-import-by-type-to-file', `Use \`import {dotdot} from './b/index.js'\` in '/lib/index.js'`);
    t.end();
});

test('esm: apply-import-by-type-to-file: transform', (t) => {
    t.transform('apply-import-by-type-to-file');
    t.end();
});

test('esm: apply-import-by-type-to-file: transform: private', (t) => {
    t.transform('private');
    t.end();
});

test('esm: apply-import-by-type-to-file: no report: has-export-default', (t) => {
    t.noReport('has-export-default');
    t.end();
});

test('esm: apply-import-by-type-to-file: no report: commonjs', (t) => {
    t.noReport('commonjs');
    t.end();
});

test('esm: apply-import-by-type-to-file: no report: invalid', (t) => {
    t.noReport('invalid');
    t.end();
});

test('esm: apply-import-by-type-to-file: transform: not-equal', (t) => {
    t.transform('not-equal');
    t.end();
});
