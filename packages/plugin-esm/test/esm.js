import {createTest} from '@putout/test';
import * as esm from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['esm', esm],
    ],
});

test('putout: plugin: esm: transform: add-index-to-import', (t) => {
    t.transform('add-index-to-import');
    t.end();
});

test('putout: plugin: esm: merge-duplicate-imports: declare-imports-first: transform', (t) => {
    t.transform('declare-imports-first');
    t.end();
});

test('putout: plugin: esm: merge-duplicate-imports: group-imports-by-source: transform', (t) => {
    t.transform('group-imports-by-source');
    t.end();
});

test('putout: plugin: esm: merge-duplicate-imports: transform', (t) => {
    t.transform('merge-duplicate-imports');
    t.end();
});

test('putout: plugin: esm: remove-empty-import: transform', (t) => {
    t.transformCode(`import 'hello'`, '\n');
    t.end();
});

test('putout: plugin: esm: remove-empty-export: transform', (t) => {
    t.transformCode('export {}', '\n');
    t.end();
});

test('putout: plugin: esm: remove-quotes-from-import-assertions: transform', (t) => {
    t.transform('remove-quotes-from-import-assertions');
    t.end();
});

test('putout: plugin: esm: merge-duplicate-imports: sort-imports-by-specifiers: transform', (t) => {
    t.transform('sort-imports-by-specifiers');
    t.end();
});

test('putout: plugin: esm: merge-duplicate-imports: convert-assert-to-with: transform', (t) => {
    t.transform('convert-assert-to-with');
    t.end();
});

test('plugin-esm: transform: apply-export-from', (t) => {
    t.transform('apply-export-from');
    t.end();
});

test('plugin-esm: no report: resolve-imported-file', (t) => {
    t.noReport('resolve-imported-file');
    t.end();
});

test('plugin-esm: no transform: apply-namespace-import-to-file', (t) => {
    t.noTransform('apply-namespace-import-to-file');
    t.end();
});

test('plugin-esm: transform: merge-declaration-with-export', (t) => {
    t.transform('merge-declaration-with-export');
    t.end();
});

test('plugin-esm: transform: inline-export', (t) => {
    t.transform('inline-export');
    t.end();
});

test('plugin-esm: transform: remove-useless-export-specifiers', (t) => {
    t.transform('remove-useless-export-specifiers');
    t.end();
});
