import {createTest} from '@putout/test';
import * as convertCommonjsToESM from '@putout/plugin-nodejs/convert-commonjs-to-esm';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-index-to-import', plugin],
    ],
});

test('packages: add-index-to-import: report: add-index-to-import', (t) => {
    t.report('add-index-to-import', `Add 'index.js' to import: './insert-rust' -> './insert-rust/index.js'`);
    t.end();
});

test('packages: add-index-to-import: transform: add-index-to-import', (t) => {
    t.transform('add-index-to-import');
    t.end();
});

test('packages: add-index-to-import: no report: cjs', (t) => {
    t.noReport('cjs');
    t.end();
});

test('packages: add-index-to-import: no report: mjs', (t) => {
    t.noReport('mjs');
    t.end();
});

test('packages: add-index-to-import: no report: json', (t) => {
    t.noReport('json');
    t.end();
});

test('packages: add-index-to-import: no report: external', (t) => {
    t.noReport('external');
    t.end();
});

test('packages: add-index-to-import: no report after transform: convert-commonjs-to-esm', (t) => {
    t.noReportAfterTransform('convert-commonjs-to-esm', {
        convertCommonjsToESM,
    });
    t.end();
});
