import {createTest} from '@putout/test';
import * as plugin from './index.js';
import * as applyExportFrom from '../apply-export-from/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['inline-export', plugin],
    ],
});

test('esm: inline-export: report', (t) => {
    t.report('inline-export', `Inline export`);
    t.end();
});

test('esm: inline-export: transform', (t) => {
    t.transform('inline-export');
    t.end();
});

test('esm: inline-export: no report: import', (t) => {
    t.noReport('import');
    t.end();
});

test('esm: inline-export: transform: apply-export-from', (t) => {
    t.transform('apply-export-from', {
        applyExportFrom,
    });
    t.end();
});
