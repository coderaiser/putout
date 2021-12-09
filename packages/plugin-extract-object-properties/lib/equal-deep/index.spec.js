'use strict';

const equalDeep = require('.');

const test = require('@putout/test')(__dirname, {
    'extract-object-properties/equal-deep': equalDeep,
});

test('plugin-extract-object-properties: equal-deep: report', (t) => {
    t.report('fn', 'Object properties should be extracted into variables');
    t.end();
});

test('plugin-extract-object-properties: equal-deep: transform', (t) => {
    t.transform('object');
    t.end();
});

test('plugin-extract-object-properties: equal-deep: transform: fn', (t) => {
    t.transform('fn');
    t.end();
});

test('plugin-extract-object-properties: equal-deep: transform: fn-args', (t) => {
    t.noTransform('fn-args');
    t.end();
});

test('plugin-extract-object-properties: equal-deep: transform: no var', (t) => {
    t.noTransform('not-var');
    t.end();
});

test('plugin-extract-object-properties: equal-deep: transform: one property', (t) => {
    t.noTransform('one-prop');
    t.end();
});

test('plugin-extract-object-properties: equal-deep: transform: var exist', (t) => {
    t.noTransform('var-exist');
    t.end();
});

test('plugin-extract-object-properties: equal-deep: transform: default', (t) => {
    t.noTransform('default');
    t.end();
});

test('plugin-extract-object-properties: equal-deep: no transform: no destructuring', (t) => {
    t.noTransform('no-destr');
    t.end();
});

test('plugin-extract-object-properties: equal-deep: no transform: array', (t) => {
    t.noTransform('array');
    t.end();
});

test('plugin-extract-object-properties: equal-deep: transform: same', (t) => {
    t.transform('same');
    t.end();
});

test('plugin-extract-object-properties: equal-deep: transform: scope', (t) => {
    t.noTransform('scope');
    t.end();
});
