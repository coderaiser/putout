'use strict';

const {createTest} = require('@putout/test');
const removeUselessVariables = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['remove-useless-variables', removeUselessVariables],
    ],
});

test('remove useless variables: report: function', (t) => {
    t.report('function', 'Useless variable declaration with name "b"');
    t.end();
});

test('remove useless variables: transform: function', (t) => {
    t.transform('function');
    t.end();
});

test('remove useless variables: no transform: global', (t) => {
    t.noTransform('global');
    t.end();
});

test('remove useless variables: transform: destructure', (t) => {
    t.transform('destructure');
    t.end();
});

test('remove useless variables: transform: shorthand', (t) => {
    t.transform('shorthand');
    t.end();
});

test('remove useless variables: transform: property', (t) => {
    t.transform('property');
    t.end();
});

test('remove useless variables: transform: uppercase', (t) => {
    t.transform('uppercase');
    t.end();
});

test('remove useless variables: no transform: not-declared', (t) => {
    t.noTransform('not-declared');
    t.end();
});

test('remove useless variables: no transform: argument', (t) => {
    t.noTransform('argument');
    t.end();
});

test('remove useless variables: no transform: export', (t) => {
    t.noTransform('export');
    t.end();
});

test('remove useless variables: no transform: var', (t) => {
    t.noTransform('var');
    t.end();
});

test('remove useless variables: transform: destruct', (t) => {
    t.transform('destruct');
    t.end();
});

test('remove useless variables: transform: useless-declarations', (t) => {
    t.transform('declaration');
    t.end();
});

test('plugin-remove-useless-variables: transform: duplicate', (t) => {
    t.transform('duplicate');
    t.end();
});
