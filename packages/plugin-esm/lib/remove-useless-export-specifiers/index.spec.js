import {createTest} from '@putout/test';
import * as plugin from './index.js';
import * as applyExportFrom from '../apply-export-from/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-export-specifiers', plugin],
    ],
});

test('esm: remove-useless-export: report: remove-useless-export-specifiers', (t) => {
    t.report('remove-useless-export-specifiers', `Avoid useless export specifier`);
    t.end();
});

test('esm: remove-useless-export-specifiers: transform', (t) => {
    t.transform('remove-useless-export-specifiers');
    t.end();
});

test('esm: remove-useless-export-specifiers: transform: apply-export-from', (t) => {
    t.transform('apply-export-from', {
        applyExportFrom,
    });
    t.end();
});

test('esm: remove-useless-export-specifiers: no report: export-from', (t) => {
    t.noReport('export-from');
    t.end();
});
