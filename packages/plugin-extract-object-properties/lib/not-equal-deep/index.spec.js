'use strict';

const {createTest} = require('@putout/test');
const extractObjectProperties = require('.');

const applyDestructuring = require('@putout/plugin-apply-destructuring');
const removeUnusedVariables = require('@putout/plugin-remove-unused-variables');
const putout = require('@putout/plugin-putout');

const test = createTest(__dirname, {
    'extract-object-properties': extractObjectProperties,
});

test('plugin-extract-object-properties: not-equal-deep: report', (t) => {
    t.report('object', 'Extract object properties into variables');
    t.end();
});

test('plugin-extract-object-properties: not-equal-deep: transform: object', (t) => {
    t.transform('object');
    t.end();
});

test('plugin-extract-object-properties: not-equal-deep: transform: fn', (t) => {
    t.transform('fn');
    t.end();
});

test('plugin-extract-object-properties: not-equal-deep: transform: operate', (t) => {
    t.transform('operate', {
        putout,
    });
    t.end();
});

test('plugin-extract-object-properties: not-equal-deep: no transform: var exists', (t) => {
    t.noTransform('var-exists');
    t.end();
});

test('plugin-extract-object-properties: not-equal-deep: no transform: not destructuring', (t) => {
    t.noTransform('not-destr');
    t.end();
});

test('plugin-extract-object-properties: not-equal-deep: no transform: property not identifier', (t) => {
    t.noTransform('not-identifier');
    t.end();
});

test('plugin-extract-object-properties: not-equal-deep: no transform: different scopes', (t) => {
    t.noTransform('different-scopes');
    t.end();
});

test('plugin-extract-object-properties: not-equal-deep: transform: no scope', (t) => {
    t.transform('no-scope', {
        'apply-destructuring': applyDestructuring,
    });
    t.end();
});

test('plugin-extract-object-properties: not-equal-deep: transform: remove unused-variables: duplicate declaration', (t) => {
    t.transform('remove-unused-variables', {
        'remove': removeUnusedVariables,
        'putout/convert-replace-with': putout.rules['convert-replace-with'],
    });
    t.end();
});

