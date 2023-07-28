'use strict';

const {createTest} = require('@putout/test');
const minify = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['minify', minify],
    ],
});

test('plugin-minify: transform: apply-ternary', (t) => {
    t.transform('apply-ternary');
    t.end();
});

test('plugin-minify: transform: apply-template-literal', (t) => {
    t.transform('apply-template-literal');
    t.end();
});

test('plugin-minify: transform: convert-if-to-logical', (t) => {
    t.transform('convert-if-to-logical');
    t.end();
});

test('plugin-minify: transform: convert-strict-equal-to-equal', (t) => {
    t.transform('convert-strict-equal-to-equal');
    t.end();
});

test('plugin-minify: transform: extract-body', (t) => {
    t.transform('extract-body');
    t.end();
});

test('plugin-minify: transform: expand-body', (t) => {
    t.transform('expand-bindings');
    t.end();
});

test('plugin-minify: transform: remove-var-undefined', (t) => {
    t.transform('remove-var-undefined');
    t.end();
});

test('plugin-minify: transform: remove-return-undefined', (t) => {
    t.transform('remove-return-undefined');
    t.end();
});

test('plugin-minify: transform: mangle-names', (t) => {
    t.transform('mangle-names');
    t.end();
});

test('plugin-minify: transform: merge-variables', (t) => {
    t.transform('merge-variables');
    t.end();
});

test('plugin-minify: transform: shorten-names', (t) => {
    t.transform('shorten-names');
    t.end();
});

test('plugin-minify: transform: types', (t) => {
    t.transform('types');
    t.end();
});

test('plugin-minify: transform: inline', (t) => {
    t.transform('inline');
    t.end();
});

test('plugin-minify: transform: simplify-floor', (t) => {
    t.transform('simplify-floor');
    t.end();
});

test('plugin-minify: transform: convert-const-to-var', (t) => {
    t.transform('convert-const-to-var');
    t.end();
});
