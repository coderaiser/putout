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

test('plugin-merge-destructuring-properties: transform: quotes', (t) => {
    t.transform('quotes');
    t.end();
});

test('plugin-merge-destructuring-properties: no transform: exports', (t) => {
    t.transform('exports', {
        'convert-commonjs-to-esm': convert,
    });
    
    t.end();
});
