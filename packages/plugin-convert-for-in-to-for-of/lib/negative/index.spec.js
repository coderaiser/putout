'use strict';

const {createTest} = require('@putout/test');
const negative = require('.');

const test = createTest(__dirname, {
    'convert-for-in-to-for-of/negative': negative,
});

test('plugin-convert-for-in-to-for-of: negative: report', (t) => {
    t.report('for-in', 'for-of should be used instead of for-in');
    t.end();
});

test('plugin-convert-for-in-to-for-of: negative: transform', (t) => {
    t.transform('for-in');
    t.end();
});

test('plugin-convert-for-in-to-for-of: negative: transform: for-in-body', (t) => {
    t.transform('for-in-body');
    t.end();
});

test('plugin-convert-for-in-to-for-of: negative: no transform: no-has-own', (t) => {
    t.noTransform('no-has-own');
    t.end();
});

