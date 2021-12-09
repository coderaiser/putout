'use strict';

const removeUnusedTypes = require('..');

const test = require('@putout/test')(__dirname, {
    'remove-unused-types': removeUnusedTypes,
});

test('remove unused types: report', (t) => {
    t.report('unused', '"Point" is defined but never used');
    t.end();
});

test('remove unused types: transform', (t) => {
    t.transform('unused', '\n\n');
    t.end();
});

test('remove unused types: no transform: used', (t) => {
    t.noTransform('used');
    t.end();
});

test('remove unused types: no transform: not defined', (t) => {
    t.noTransform('not-defined');
    t.end();
});

test('remove unused types: no transform: export', (t) => {
    t.noTransform('export');
    t.end();
});

test('remove unused types: no transform: export-named', (t) => {
    t.noTransform('export-named');
    t.end();
});

test('remove unused types: no transform: export default', (t) => {
    t.noTransform('export-default');
    t.end();
});

test('remove unused types: no transform: export default object', (t) => {
    t.noTransform('export-default-object');
    t.end();
});

test('remove unused types: no transform: bubling', (t) => {
    t.noTransform('bubling');
    t.end();
});

