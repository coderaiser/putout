'use strict';

const {createTest} = require('@putout/test');
const removeDuplicateKeys = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['remove-duplicate-keys', removeDuplicateKeys],
    ],
});

test('remove duplicate-keys: report: duplicate', (t) => {
    t.report('duplicate', 'Avoid duplicate keys');
    t.end();
});

test('remove duplicate-keys: transform: condition', (t) => {
    t.transform('condition');
    t.end();
});

test('remove duplicate-keys: transform: duplicate-literal', (t) => {
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

test('remove duplicate-keys: transform: a-lot', (t) => {
    t.transform('a-lot');
    t.end();
});

test('remove duplicate-keys: no transform: extract', (t) => {
    t.noTransform('extract');
    t.end();
});

test('remove duplicate-keys: no transform: no-duplicate', (t) => {
    t.noTransform('no-duplicate');
    t.end();
});

test('remove duplicate-keys: no transform: rename', (t) => {
    t.noTransform('rename');
    t.end();
});

test('remove duplicate-keys: transform: member', (t) => {
    t.transform('member');
    t.end();
});

test('remove duplicate-keys: transform: array', (t) => {
    t.transform('array');
    t.end();
});
