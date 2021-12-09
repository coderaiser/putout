'use strict';

const rename = require('.');

const test = require('@putout/test')(__dirname, {
    'remove-useless-variables/rename': rename,
});

test('remove-useless-variables: rename: report', (t) => {
    t.report('function', 'Useless variable declaration with name "b"');
    t.end();
});

test('remove-useless-variables: rename: transform', (t) => {
    t.transform('function');
    t.end();
});

test('remove-useless-variables: rename: transform: global', (t) => {
    t.noTransform('global');
    t.end();
});

test('remove-useless-variables: rename: transform: destructure', (t) => {
    t.transform('destructure');
    t.end();
});

test('remove-useless-variables: rename: transform: shorthand', (t) => {
    t.transform('shorthand');
    t.end();
});

test('remove-useless-variables: rename: transform: property', (t) => {
    t.transform('property');
    t.end();
});

test('remove-useless-variables: rename: transform: upper case', (t) => {
    t.transform('uppercase');
    t.end();
});

test('remove-useless-variables: rename: transform: not declared', (t) => {
    t.noTransform('not-declared');
    t.end();
});

test('remove-useless-variables: rename: transform: argument', (t) => {
    t.noTransform('argument');
    t.end();
});

test('remove-useless-variables: rename: transform: export', (t) => {
    t.noTransform('export');
    t.end();
});

test('remove-useless-variables: rename: transform: var', (t) => {
    t.noTransform('var');
    t.end();
});

