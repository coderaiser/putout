'use strict';

const convert = require('@putout/plugin-convert-commonjs-to-esm');

const test = require('@putout/test')(__dirname, {
    'merge-destructuring-properties': require('..'),
});

test('plugin-merge-destructuring-properties: transform: report', (t) => {
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

test('plugin-merge-destructuring-properties: transform: putout/declare', (t) => {
    t.transform('putout-declare', {
        'putout/declare': require('@putout/plugin-putout').rules.declare,
    });
    t.end();
});

test('plugin-merge-destructuring-properties: no transform: exports', (t) => {
    t.transform('exports', {
        'convert-commonjs-to-esm': convert,
    });
    
    t.end();
});

test('plugin-merge-destructuring-properties: no transform: removed variable', (t) => {
    t.transform('mock-require', {
        'convert-commonjs-to-esm': convert,
        'convert-mock-require-to-mock-import': require('@putout/plugin-convert-mock-require-to-mock-import'),
    });
    
    t.end();
});
