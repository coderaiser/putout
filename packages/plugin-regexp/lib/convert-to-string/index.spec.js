'use strict';

const {createTest} = require('@putout/test');
const convertToString = require('.');

const test = createTest(__dirname, {
    'regexp/convert-to-string': convertToString,
});

test('plugin-regexp/convert-to-string: report', (t) => {
    t.report('replace', 'String should be used instead of RegExp');
    t.end();
});

test('plugin-regexp/convert-to-string: transform', (t) => {
    t.transform('replace');
    t.end();
});

test('plugin-regexp/convert-to-string: transform: replace-all', (t) => {
    t.transform('replace-all');
    t.end();
});

test('plugin-regexp/convert-to-string: no transform: flags', (t) => {
    t.noTransform('replace-all-flags');
    t.end();
});

test('plugin-regexp/convert-to-string: no transform: replace with flags', (t) => {
    t.noTransform('replace-flags');
    t.end();
});

test('plugin-regexp/simplify: disjunction', (t) => {
    t.noTransform('disjunction');
    t.end();
});

test('plugin-regexp/simplify: \\d', (t) => {
    t.noTransform('meta');
    t.end();
});

