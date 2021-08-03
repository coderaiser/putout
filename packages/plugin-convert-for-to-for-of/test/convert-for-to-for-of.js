'use strict';

const test = require('@putout/test')(__dirname, {
    'convert-for-to-for-of': require('..'),
});

test('plugin-convert-for-to-for-of: report', (t) => {
    t.report('for', 'for-of should be used instead of for');
    t.end();
});

test('plugin-convert-for-to-for-of: transform', (t) => {
    t.transform('for');
    t.end();
});

test('plugin-convert-for-to-for-of: transform: for to n', (t) => {
    t.transform('for-to-n');
    t.end();
});

test('plugin-convert-for-to-for-of: no transform: more i references', (t) => {
    t.noTransform('for-more');
    t.end();
});

test('plugin-convert-for-to-for-of: no transform: no body', (t) => {
    t.noTransform('no-body');
    t.end();
});

test('plugin-convert-for-to-for-of: no transform: more i references n', (t) => {
    t.noTransform('for-more-n');
    t.end();
});

test('plugin-convert-for-to-for-of: no transform: for to n no prev', (t) => {
    t.noTransform('for-to-n-no-prev');
    t.end();
});

test('plugin-convert-for-to-for-of: no transform: for to n no assign', (t) => {
    t.noTransform('for-to-n-no-assign');
    t.end();
});

test('plugin-convert-for-to-for-of: no transform: for to n wrong prev', (t) => {
    t.noTransform('for-to-n-wrong-prev');
    t.end();
});

