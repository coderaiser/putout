'use strict';

const {createTest} = require('@putout/test');
const {declare} = require('@putout/plugin-putout').rules;
const tape = require('@putout/plugin-tape');
const convert = require('@putout/plugin-nodejs/convert-commonjs-to-esm');

const mergeDestructuringProperties = require('..');

const test = createTest(__dirname, {
    'merge-destructuring-properties': mergeDestructuringProperties,
});

test('plugin-merge-destructuring-properties: report', (t) => {
    t.report('object', 'Object properties should be merged when destructuring');
    t.end();
});

test('plugin-merge-destructuring-properties: transform: object', (t) => {
    t.transform('object');
    t.end();
});

test('plugin-merge-destructuring-properties: transform: properties', (t) => {
    t.transform('properties');
    t.end();
});

test('plugin-merge-destructuring-properties: transform: vars', (t) => {
    t.transform('vars');
    t.end();
});

test('plugin-merge-destructuring-properties: transform: require', (t) => {
    t.transform('require');
    t.end();
});

test('plugin-merge-destructuring-properties: transform: quotes', (t) => {
    t.transform('quotes');
    t.end();
});

test('plugin-merge-destructuring-properties: no transform: rest', (t) => {
    t.noTransform('rest');
    t.end();
});

test('plugin-merge-destructuring-properties: transform: putout/declare', (t) => {
    t.transform('putout-declare', {
        'putout/declare': declare,
    });
    t.end();
});

test('plugin-merge-destructuring-properties: transform: tape', (t) => {
    t.transform('tape', {
        'putout/tape': tape,
    });
    t.end();
});

test('plugin-merge-destructuring-properties: no transform: exports', (t) => {
    t.transform('exports', {
        'node/convert-commonjs-to-esm': convert,
    });
    t.end();
});

test('plugin-merge-destructuring-properties: no transform: removed variable', (t) => {
    t.transform('mock-require', {
        'node/convert-commonjs-to-esm': convert,
        'tape/convert-mock-require-to-mock-import': tape.rules['convert-mock-require-to-mock-import'],
    });
    t.end();
});
