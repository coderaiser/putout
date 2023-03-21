'use strict';

const {createTest} = require('@putout/test');
const applyNumericSeparators = require('.');

const webpack = require('@putout/plugin-webpack');
const test = createTest(__dirname, {
    'math/apply-numeric-separators': applyNumericSeparators,
});

test('plugin-math: apply-numeric-separators: transform: report', (t) => {
    t.report('number', 'Numeric separators should be used');
    t.end();
});

test('plugin-math: apply-numeric-separators: transform: number', (t) => {
    t.transform('number');
    t.end();
});

test('plugin-math: apply-numeric-separators: no transform: sep', (t) => {
    t.noTransform('sep');
    t.end();
});

test('plugin-math: apply-numeric-separators: no transform: min', (t) => {
    t.noTransform('min');
    t.end();
});

test('plugin-math: apply-numeric-separators: no report: min', (t) => {
    t.noReport('min');
    t.end();
});

test('plugin-math: apply-numeric-separators: no transform: hex', (t) => {
    t.noTransform('hex');
    t.end();
});

test('plugin-math: apply-numeric-separators: no report: e', (t) => {
    t.noReport('e');
    t.end();
});

test('plugin-math: apply-numeric-separators: no report: octal', (t) => {
    t.noReport('octal');
    t.end();
});

test('plugin-math: apply-numeric-separators: no report: not-integer', (t) => {
    t.noReport('not-integer');
    t.end();
});

test('plugin-math: apply-numeric-separators: transform: webpack', (t) => {
    t.transform('webpack', {
        webpack,
    });
    t.end();
});
