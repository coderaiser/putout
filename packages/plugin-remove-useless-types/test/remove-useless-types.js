'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-useless-types': require('..'),
});

test('remove usless types: report', (t) => {
    t.report('types', 'Avoid useless type declaration');
    t.end();
});

test('remove usless types: transform', (t) => {
    t.transform('types');
    t.end();
});

test('remove usless types: transform: return', (t) => {
    t.transform('return');
    t.end();
});

test('remove usless types: transform: array', (t) => {
    t.transform('array');
    t.end();
});

test('remove usless types: no transform: generic', (t) => {
    t.noTransform('generic');
    t.end();
});

test('remove usless types: no transform: export', (t) => {
    t.noTransform('export');
    t.end();
});

test('remove usless types: no transform: qualified name', (t) => {
    t.noTransform('qualified-name');
    t.end();
});

