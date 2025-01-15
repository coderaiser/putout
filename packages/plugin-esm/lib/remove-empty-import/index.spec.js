'use strict';

const {createTest} = require('@putout/test');
const removeEmptyImport = require('.');

const test = createTest(__dirname, {
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
