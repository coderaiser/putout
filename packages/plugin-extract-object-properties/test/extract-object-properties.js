'use strict';

const test = require('@putout/test')(__dirname, {
    'extract-object-properties': require('..'),
});

test('plugin-extract-object-properties: report', (t) => {
    t.report('fn', 'object properties should be extracted into variables');
    t.end();
});

test('plugin-extract-object-properties: transform', (t) => {
    t.transform('object');
    t.end();
});

test('plugin-extract-object-properties: transform: function', (t) => {
    t.transform('fn');
    t.end();
});

test('plugin-extract-object-properties: transform: function', (t) => {
    t.noTransform('fn-args');
    t.end();
});

test('plugin-extract-object-properties: transform: no var', (t) => {
    t.noTransform('not-var');
    t.end();
});

test('plugin-extract-object-properties: transform: one property', (t) => {
    t.noTransform('one-prop');
    t.end();
});

test('plugin-extract-object-properties: transform: var exist', (t) => {
    t.noTransform('var-exist');
    t.end();
});

test('plugin-extract-object-properties: transform: default', (t) => {
    t.noTransform('default');
    t.end();
});

test('plugin-extract-object-properties: transform: no destructuring', (t) => {
    t.noTransform('no-destr');
    t.end();
});
