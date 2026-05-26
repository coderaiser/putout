import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['resolve-imported-file-with-extension', plugin],
    ],
});

test('esm: resolve-imported-file-with-extension: report', (t) => {
    t.report('resolve-imported-file-with-extension', `Resolve import source: './a.cjs' -> './a.js' in '/lib/index.js'`);
    t.end();
});

test('esm: resolve-imported-file-with-extension: transform', (t) => {
    t.transform('resolve-imported-file-with-extension');
    t.end();
});

test('esm: resolve-imported-file-with-extension: no report: no-package', (t) => {
    t.noReport('no-package');
    t.end();
});

test('esm: resolve-imported-file-with-extension: transform: dynamic', (t) => {
    t.transform('dynamic');
    t.end();
});

test('esm: resolve-imported-file-with-extension: transform: slash', (t) => {
    t.transform('slash');
    t.end();
});

test('esm: resolve-imported-file-with-extension: transform: json', (t) => {
    t.transform('json');
    t.end();
});

test('esm: resolve-imported-file-with-extension: transform: dot-dot-slash', (t) => {
    t.transform('dot-dot-slash');
    t.end();
});

test('esm: resolve-imported-file-with-extension: transform: couple-levels-up', (t) => {
    t.transform('couple-levels-up');
    t.end();
});

test('esm: resolve-imported-file-with-extension: transform: no-ext', (t) => {
    t.transform('no-ext');
    t.end();
});

test('esm: resolve-imported-file-with-extension: transform: export', (t) => {
    t.transform('export');
    t.end();
});

test('esm: resolve-imported-file-with-extension: no report: exists', (t) => {
    t.noReport('exists');
    t.end();
});

test('esm: resolve-imported-file-with-extension: transform: js', (t) => {
    t.transform('js');
    t.end();
});

test('esm: resolve-imported-file-with-extension: transform: mjs', (t) => {
    t.transform('mjs');
    t.end();
});
