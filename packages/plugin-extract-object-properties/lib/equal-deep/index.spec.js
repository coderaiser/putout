'use strict';

const {createTest} = require('@putout/test');
const equalDeep = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['extract-object-properties/equal-deep', equalDeep],
    ],
});

test('plugin-extract-object-properties: equal-deep: report', (t) => {
    t.report('fn', 'Extract object properties into variables');
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

test('plugin-extract-object-properties: equal-deep: no transform: fn-args', (t) => {
    t.noTransform('fn-args');
    t.end();
});

test('plugin-extract-object-properties: equal-deep: no transform: no var', (t) => {
    t.noTransform('not-var');
    t.end();
});

test('plugin-extract-object-properties: equal-deep: no transform: one property', (t) => {
    t.noTransform('one-prop');
    t.end();
});

test('plugin-extract-object-properties: equal-deep: no transform: var exist', (t) => {
    t.noTransform('var-exist');
    t.end();
});

test('plugin-extract-object-properties: equal-deep: no transform: default', (t) => {
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

test('plugin-extract-object-properties: equal-deep: no transform: scope', (t) => {
    t.noTransform('scope');
    t.end();
});
