'use strict';

const {createTest} = require('@putout/test');
const forOf = require('..');

const test = createTest(__dirname, {
    'for-of': forOf,
});

test('plugin-for-of: transform: for-of', (t) => {
    t.transform('for-entries-n');
    t.end();
});

test('plugin-for-of: transform: map', (t) => {
    t.transform('map');
    t.end();
});

test('plugin-for-of: transform: for-each', (t) => {
    t.transform('for-each');
    t.end();
});

test('plugin-for-of: transform: for-in', (t) => {
    t.transform('for-in');
    t.end();
});

test('plugin-for-of: transform: reduce', (t) => {
    t.transform('reduce');
    t.end();
});

test('plugin-for-of: transform: remove-useless', (t) => {
    t.transform('remove-useless');
    t.end();
});

test('plugin-for-of: transform: remove-unused-variables', (t) => {
    t.transform('remove-unused-variables');
    t.end();
});

test('plugin-for-of: transform: remove-useless-array-from', (t) => {
    t.transform('remove-useless-array-from');
    t.end();
});

test('plugin-for-of: transform: remove-useless-variables', (t) => {
    t.transform('remove-useless-variables');
    t.end();
});
