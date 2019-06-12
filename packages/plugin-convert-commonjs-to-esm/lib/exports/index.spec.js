'use strict';

/* eslint node/no-unpublished-require:0 */
const convert = require('.');
const test = require('@putout/test')(__dirname, {
    'convert-commonjs-to-esm/exports': convert,
});

test('plugin-convert-esm-to-commonjs: exports: transform: report', (t) => {
    t.report('exports', 'ESM should be used insted of Commonjs');
    t.end();
});

test('plugin-convert-esm-to-commonjs: exports: transform', (t) => {
    t.transform('exports');
    t.end();
});

test('plugin-convert-esm-to-commonjs: exports: transform: string', (t) => {
    t.transform('exports-string');
    t.end();
});

test('plugin-convert-esm-to-commonjs: exports: transform: named', (t) => {
    t.transform('named');
    t.end();
});

test('plugin-convert-esm-to-commonjs: exports: transform: no member expression', (t) => {
    t.noTransform('no-member-expression');
    t.end();
});

test('plugin-convert-esm-to-commonjs: exports: transform: no exports', (t) => {
    t.noTransform('no-exports');
    t.end();
});

