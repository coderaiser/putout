import {createTest} from '@putout/test';
import * as convertCommonjsToEsm from '@putout/plugin-nodejs/convert-commonjs-to-esm';
import * as plugin from './index.js';
import * as applyExportFrom from '../apply-export-from/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['merge-export-declarations', plugin],
    ],
});

test('esm: merge-export-declarations: report', (t) => {
    t.report('merge-export-declarations', `Merge export declarations`);
    t.end();
});

test('esm: merge-export-declarations: transform', (t) => {
    t.transform('merge-export-declarations');
    t.end();
});

test('esm: merge-export-declarations: transform: same-sources', (t) => {
    t.transform('same-sources');
    t.end();
});

test('esm: merge-export-declarations: transform: convert-commonjs-to-esm', (t) => {
    t.transform('convert-commonjs-to-esm', {
        applyExportFrom,
        convertCommonjsToEsm,
    });
    t.end();
});

test('esm: merge-export-declarations: no report: different-sources', (t) => {
    t.noReport('different-sources');
    t.end();
});
