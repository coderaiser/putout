'use strict';

const applyNumericSeparators = require('..');

const webpack = require('@putout/plugin-webpack');
const test = require('@putout/test')(__dirname, {
    'apply-numeric-separators': applyNumericSeparators,
});

test('plugin-apply-numeric-separators: transform: report', (t) => {
    t.report('number', 'Numeric separators should be used');
    t.end();
});

test('plugin-apply-numeric-separators: transform', (t) => {
    t.transform('number');
    t.end();
});

test('plugin-apply-numeric-separators: no transform: sep', (t) => {
    t.noTransform('sep');
    t.end();
});

test('plugin-apply-numeric-separators: no transform: min', (t) => {
    t.noTransform('min');
    t.end();
});

test('plugin-apply-numeric-separators: no transform: hex', (t) => {
    t.noTransform('hex');
    t.end();
});

test('plugin-apply-numeric-separators: transform: webpack', (t) => {
    t.transform('webpack', {
        webpack,
    });
    t.end();
});
