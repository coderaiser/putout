import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-namespace-to-imported-file', plugin],
    ],
});

test('esm: apply-namespace-to-imported-file: report: apply-namespace-to-imported-file', (t) => {
    t.report('apply-namespace-to-imported-file', `Use \`import * as dotdot from './b/index.js'\` in '/lib/index.js'`);
    t.end();
});

test('esm: apply-namespace-to-imported-file: transform: apply-namespace-to-imported-file', (t) => {
    t.transform('apply-namespace-to-imported-file');
    t.end();
});

test('esm: apply-namespace-to-imported-file: transform: private', (t) => {
    t.transform('private');
    t.end();
});

test('esm: apply-namespace-to-imported-file: no report: has-export-default', (t) => {
    t.noReport('has-export-default');
    t.end();
});

test('esm: apply-namespace-to-imported-file: no report: commonjs', (t) => {
    t.noReport('commonjs');
    t.end();
});

test('esm: apply-namespace-to-imported-file: no report: invalid', (t) => {
    t.noReport('invalid');
    t.end();
});

test('esm: apply-namespace-to-imported-file: transform: not-equal', (t) => {
    t.transform('not-equal');
    t.end();
});

test('esm: apply-namespace-to-imported-file: no report: dynamic', (t) => {
    t.noReport('dynamic');
    t.end();
});
