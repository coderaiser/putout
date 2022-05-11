'use strict';

const {createTest} = require('@putout/test');
const extractObjectProperties = require('..');

const test = createTest(__dirname, {
    'extract-object-properties': extractObjectProperties,
});

test('plugin-extract-object-properties: report', (t) => {
    t.report('fn', 'Object properties should be extracted into variables');
    t.end();
});

test('plugin-extract-object-properties: transform', (t) => {
    t.transform('object');
    t.end();
});

test('plugin-extract-object-properties: transform: fn', (t) => {
    t.transform('fn');
    t.end();
});

test('plugin-extract-object-properties: no transform: fn-args', (t) => {
    t.noTransform('fn-args');
    t.end();
});

test('plugin-extract-object-properties: no transform: not-var', (t) => {
    t.noTransform('not-var');
    t.end();
});

test('plugin-extract-object-properties: no transform: one property', (t) => {
    t.noTransform('one-prop');
    t.end();
});

test('plugin-extract-object-properties: no transform: var exist', (t) => {
    t.noTransform('var-exist');
    t.end();
});

test('plugin-extract-object-properties: no transform: default', (t) => {
    t.noTransform('default');
    t.end();
});

test('plugin-extract-object-properties: no transform: no destructuring', (t) => {
    t.noTransform('no-destr');
    t.end();
});

test('plugin-extract-object-properties: transform: same', (t) => {
    t.transform('same');
    t.end();
});

