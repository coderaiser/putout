'use strict';

const {createTest} = require('@putout/test');
const removeDuplicateKeys = require('..');
const test = createTest(__dirname, {
    'remove-duplicate-keys': removeDuplicateKeys,
});

test('remove duplicate-keys: report', (t) => {
    t.report('duplicate', 'Avoid duplicate keys');
    t.end();
});

test('remove duplicate-keys: transform: duplicate', (t) => {
    t.transform('duplicate-literal');
    t.end();
});

test('remove duplicate-keys: transform: spread', (t) => {
    t.transform('spread');
    t.end();
});

test('remove duplicate-keys: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});

test('remove duplicate-keys: no transform: no duplicate', (t) => {
    t.noTransform('no-duplicate');
    t.end();
});

test('remove duplicate-keys: no transform: rename', (t) => {
    t.noTransform('rename');
    t.end();
});

