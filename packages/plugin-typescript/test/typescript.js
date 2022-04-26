'use strict';

const {createTest} = require('@putout/test');
const typescript = require('..');

const test = createTest(__dirname, {
    typescript,
});

test('putout: plugin: typescript: transform: apply-as-type-assertion', (t) => {
    t.transform('apply-as-type-assertion');
    t.end();
});

test('putout: plugin: typescript: transform: apply-utility-types', (t) => {
    t.transform('apply-utility-types');
    t.end();
});

test('putout: plugin: typescript: transform: convert-generic-to-shorthand', (t) => {
    t.transform('convert-generic-to-shorthand');
    t.end();
});

test('putout: plugin: typescript: transform: remove-duplicates-from-union', (t) => {
    t.transform('remove-duplicates-from-union');
    t.end();
});

test('putout: plugin: typescript: transform: remove-duplicate-inteface-keys', (t) => {
    t.transform('remove-duplicate-interface-keys');
    t.end();
});

test('putout: plugin: typescript: transform: remove-useless-types-from-constants', (t) => {
    t.transform('remove-useless-types-from-constants');
    t.end();
});

test('putout: plugin: typescript: transform: remove-useless-mapped-types', (t) => {
    t.transform('remove-useless-mapped-types');
    t.end();
});

test('putout: plugin: typescript: transform: remove-useless-mapping-modifiers', (t) => {
    t.transform('remove-useless-mapping-modifiers');
    t.end();
});

test('putout: plugin: typescript: transform: remove-useless-types', (t) => {
    t.transform('remove-useless-types');
    t.end();
});

test('putout: plugin: typescript: transform: remove-unused-types', (t) => {
    t.transform('remove-unused-types', '\n\n');
    t.end();
});

test('putout: plugin: typescript: transform: remove-duplicate-exports', (t) => {
    t.transform('remove-duplicate-exports');
    t.end();
});

