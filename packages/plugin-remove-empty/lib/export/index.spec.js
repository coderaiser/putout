'use strict';

const {createTest} = require('@putout/test');
const removeEmptyExport = require('.');

const test = createTest(__dirname, {
    'remove-empty-export': removeEmptyExport,
});

test('plugin-remove-empty: export: report', (t) => {
    t.reportCode('export {}', 'Remove empty export');
    t.end();
});

test('plugin-remove-empty: export', (t) => {
    t.transformCode('export {}', '');
    t.end();
});

test('plugin-remove-empty: export: no transform: not empty', (t) => {
    t.noTransformCode('export {a}');
    t.end();
});

test('plugin-remove-empty: export: no transform: declaration', (t) => {
    t.noTransformCode('export const a = 5');
    t.end();
});

