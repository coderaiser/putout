import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['shorten-imported-file', plugin],
    ],
});

test('esm: shorten-imported-file: report', (t) => {
    t.report('shorten-imported-file', `Shorten import source: '../processors/parse-processor-names.js' -> './parse-processor-names.js' in '/processors/load-processors-async.js'`);
    t.end();
});

test('esm: shorten-imported-file: transform', (t) => {
    t.transform('shorten-imported-file');
    t.end();
});

test('esm: shorten-imported-file: transform: cjs', (t) => {
    t.transform('cjs');
    t.end();
});

test('esm: shorten-imported-file: transform: nested', (t) => {
    t.transform('nested');
    t.end();
});

test('esm: shorten-imported-file: no report: short', (t) => {
    t.noReport('short');
    t.end();
});

test('esm: shorten-imported-file: no report: short-nested', (t) => {
    t.noReport('short-nested');
    t.end();
});

test('esm: shorten-imported-file: no report: invalid', (t) => {
    t.noReport('invalid');
    t.end();
});

test('esm: shorten-imported-file: transform: dynamic', (t) => {
    t.transform('dynamic');
    t.end();
});

test('esm: shorten-imported-file: transform: export', (t) => {
    t.transform('export');
    t.end();
});

