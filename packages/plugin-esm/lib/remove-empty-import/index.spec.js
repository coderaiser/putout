import {createTest} from '@putout/test';
import * as removeEmptyImport from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-empty-import', removeEmptyImport],
    ],
});

test('plugin-remove-empty: import: report', (t) => {
    t.report('import', `Avoid empty 'import' statement`);
    t.end();
});

test('plugin-remove-empty: import', (t) => {
    t.transform('import', '\n');
    t.end();
});

test('plugin-remove-empty: import: not-empty-import', (t) => {
    t.noTransform('not-empty-import');
    t.end();
});

test('plugin-remove-empty: import: import-css', (t) => {
    t.noTransform('import-css');
    t.end();
});

test('plugin-remove-empty: import: import-min', (t) => {
    t.noTransform('import-min');
    t.end();
});

test('plugin-remove-empty: import: options', (t) => {
    t.noTransformWithOptions('options', {
        ignore: ['firebase'],
    });
    t.end();
});
