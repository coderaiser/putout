'use strict';

const {createTest} = require('@putout/test');

const removeEmpty = require('@putout/plugin-remove-empty');
const removeUnusedForOfVariables = require('.');

const removeUselessVariables = require('../remove-useless-variables');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-unused-for-of-variables', removeUnusedForOfVariables],
    ],
});

test('remove unused for-of-variables: report: object', (t) => {
    t.report('object', `'b' inside 'for...of' loop defined but never used`);
    t.end();
});

test('remove unused for-of-variables: report: array', (t) => {
    t.report('array', `'b' inside 'for...of' loop defined but never used`);
    t.end();
});

test('remove unused for-of-variables: transform: object', (t) => {
    t.transform('object');
    t.end();
});

test('remove unused for-of-variables: transform: array', (t) => {
    t.transform('array');
    t.end();
});

test('remove unused for-of-variables: no transform: identifier', (t) => {
    t.noTransform('identifier');
    t.end();
});

test('remove unused for-of-variables: transform: object: one', (t) => {
    t.transform('object-one');
    t.end();
});

test('remove unused for-of-variables: transform: array: one', (t) => {
    t.transform('array-one');
    t.end();
});

test('remove unused for-of-variables: no transform: referenced', (t) => {
    t.noTransform('referenced');
    t.end();
});

test('remove unused for-of-variables: transform: array-sparse', (t) => {
    t.transform('array-sparse');
    t.end();
});

test('remove unused for-of-variables: no transform: spread', (t) => {
    t.noTransform('spread');
    t.end();
});

test('remove unused for-of-variables: transform: remove-useless-variables', (t) => {
    t.transform('for-of', {
        'remove-useless-variables/for-of': removeUselessVariables,
    });
    t.end();
});

test('remove unused for-of-variables: transform: remove-empty', (t) => {
    t.transform('remove-empty', {
        removeEmpty,
    });
    t.end();
});

test('remove unused for-of-variables: transform: entries', (t) => {
    t.transform('entries');
    t.end();
});
