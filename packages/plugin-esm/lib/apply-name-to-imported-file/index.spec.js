import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-import-by-type-to-file', plugin],
    ],
});

test('esm: apply-name-to-imported-file: report: apply-import-by-type-to-file', (t) => {
    t.report('apply-import-by-type-to-file', `Use \`import {dotdot} from './b/index.js'\` in '/lib/index.js'`);
    t.end();
});

test('esm: apply-name-to-imported-file: transform: apply-import-by-type-to-file', (t) => {
    t.transform('apply-import-by-type-to-file');
    t.end();
});

test('esm: apply-name-to-imported-file: transform: private', (t) => {
    t.transform('private');
    t.end();
});

test('esm: apply-name-to-imported-file: no report: has-export-default', (t) => {
    t.noReport('has-export-default');
    t.end();
});

test('esm: apply-name-to-imported-file: no report: commonjs', (t) => {
    t.noReport('commonjs');
    t.end();
});

test('esm: apply-name-to-imported-file: no report: invalid', (t) => {
    t.noReport('invalid');
    t.end();
});

test('esm: apply-name-to-imported-file: no report: not-equal', (t) => {
    t.noReport('not-equal');
    t.end();
});
