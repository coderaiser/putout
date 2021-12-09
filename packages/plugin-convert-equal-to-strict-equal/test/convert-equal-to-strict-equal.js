'use strict';

const convertEqualToStrictEqual = require('..');

const test = require('@putout/test')(__dirname, {
    'convert-equal-to-strict-equal': convertEqualToStrictEqual,
});

test('plugin-convert-equal-to-strict-equal: report', (t) => {
    t.report('equal', 'Strict equal should be used instead of equal');
    t.end();
});

test('plugin-convert-equal-to-strict-equal: transform', (t) => {
    t.transform('equal');
    t.end();
});

test('plugin-convert-equal-to-strict-equal: no transform: null', (t) => {
    t.noTransform('null');
    t.end();
});

test('plugin-convert-equal-to-strict-equal: no transform: not null', (t) => {
    t.noTransform('not-null');
    t.end();
});

