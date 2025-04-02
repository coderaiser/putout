import {createTest} from '@putout/test';
import * as removeEmptyExport from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-empty-export', removeEmptyExport],
    ],
});

test('plugin-remove-empty: export: report', (t) => {
    t.reportCode('export {}', 'Remove empty export');
    t.end();
});

test('plugin-remove-empty: export', (t) => {
    t.transformCode('export {}', '\n');
    t.end();
});

test('plugin-remove-empty: export: no transform: not empty', (t) => {
    t.noTransformCode('export {\n    a,\n};\n');
    t.end();
});

test('plugin-remove-empty: export: no transform: declaration', (t) => {
    t.noTransformCode('export const a = 5;\n');
    t.end();
});
