import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-name-to-imported-file', plugin],
    ],
});

test('esm: apply-name-to-imported-file: report: apply-name-to-imported-file', (t) => {
    t.report('apply-name-to-imported-file', `Use \`import {dotdot} from './b/index.js'\` in '/lib/index.js'`);
    t.end();
});

test('esm: apply-name-to-imported-file: transform: apply-name-to-imported-file', (t) => {
    t.transform('apply-name-to-imported-file');
    t.end();
});

test('esm: apply-name-to-imported-file: transform: private', (t) => {
    t.transform('private');
    t.end();
});

test('esm: apply-name-to-imported-file: transform: export', (t) => {
    t.transform('export');
    t.end();
});

test('esm: apply-name-to-imported-file: transform: dynamic', (t) => {
    t.transform('dynamic');
    t.end();
});

test('esm: apply-name-to-imported-file: report: dynamic', (t) => {
    t.report('dynamic', `Use \`const {dotdot} = await import('./b/index.js')\` in '/lib/index.js'`);
    t.end();
});

test('esm: apply-name-to-imported-file: report: export', (t) => {
    t.report('export', `Use \`export {dotdot} from './b/index.js'\` in '/lib/index.js'`);
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
