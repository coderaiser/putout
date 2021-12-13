'use strict';

const {createTest} = require('@putout/test');
const removeUselessVariables = require('..');

const test = createTest(__dirname, {
    'remove-useless-variables': removeUselessVariables,
});

test('remove usless variables: report', (t) => {
    t.report('function', 'Useless variable declaration with name "b"');
    t.end();
});

test('remove usless variables: transform', (t) => {
    t.transform('function');
    t.end();
});

test('remove usless variables: transform: global', (t) => {
    t.noTransform('global');
    t.end();
});

test('remove usless variables: transform: destructure', (t) => {
    t.transform('destructure');
    t.end();
});

test('remove usless variables: transform: shorthand', (t) => {
    t.transform('shorthand');
    t.end();
});

test('remove usless variables: transform: property', (t) => {
    t.transform('property');
    t.end();
});

test('remove usless variables: transform: upper case', (t) => {
    t.transform('uppercase');
    t.end();
});

test('remove usless variables: transform: not declared', (t) => {
    t.noTransform('not-declared');
    t.end();
});

test('remove usless variables: transform: argument', (t) => {
    t.noTransform('argument');
    t.end();
});

test('remove usless variables: transform: export', (t) => {
    t.noTransform('export');
    t.end();
});

test('remove usless variables: transform: var', (t) => {
    t.noTransform('var');
    t.end();
});

