'use strict';

const {createTest} = require('@putout/test');
const forOf = require('.');

const removeUselessArrayFrom = require('@putout/plugin-remove-useless-array-from');

const test = createTest(__dirname, {
    'remove-useless-variables/for-of': forOf,
});

test('remove usless variables: for-of: report', (t) => {
    t.report('for-of', 'Destructuring should be used in the head of for-of');
    t.end();
});

test('remove usless variables: for-of: transform', (t) => {
    t.transform('for-of');
    t.end();
});

test('remove usless variables: for-of: transform: array-pattern', (t) => {
    t.transform('array-pattern');
    t.end();
});

test('remove usless variables: for-of: no transform: no destr', (t) => {
    t.noTransform('no-destr');
    t.end();
});

test('remove usless variables: for-of: no transform: more refs', (t) => {
    t.noTransform('more-refs');
    t.end();
});

test('remove usless variables: for-of: no transform: no declaration', (t) => {
    t.noTransform('no-declaration');
    t.end();
});

test('remove usless variables: for-of: no transform: multiple', (t) => {
    t.noTransform('for-of-multiple');
    t.end();
});

test('remove usless variables: for-of: no transform: assignment', (t) => {
    t.noTransform('assignment');
    t.end();
});

test('remove usless variables: for-of: transform with options', (t) => {
    t.transform('array-from', {
        'remove-useless-array-from': removeUselessArrayFrom,
    });
    t.end();
});

test('remove usless variables: for-of: transform with options: multiple', (t) => {
    t.transformWithOptions('for-of-options', {
        maxProperties: Infinity,
    });
    t.end();
});

