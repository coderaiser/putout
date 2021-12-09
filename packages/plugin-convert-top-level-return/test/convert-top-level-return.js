'use strict';

const convertTopLevelReturn = require('..');

const test = require('@putout/test')(__dirname, {
    'convert-top-level-return': convertTopLevelReturn,
});

test('plugin-convert-top-level-return: report', (t) => {
    t.report('return', '"process.exit" should be used instead of top-level return');
    t.end();
});

test('plugin-convert-top-level-return: transform', (t) => {
    t.transform('return');
    t.end();
});

test('plugin-convert-top-level-return: transform: if', (t) => {
    t.transform('if');
    t.end();
});

test('plugin-convert-top-level-return: transform: return arg', (t) => {
    t.transform('return-arg');
    t.end();
});

test('plugin-convert-top-level-return: no transform: function', (t) => {
    t.noTransform('fn');
    t.end();
});
