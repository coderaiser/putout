'use strict';

const test = require('@putout/test')(__dirname, {
    'convert-for-to-for-of/negative': require('.'),
});

test('plugin-convert-for-to-for-of: negative: report', (t) => {
    t.report('for-in', 'for-of should be used instead of for-in');
    t.end();
});

test('plugin-convert-for-to-for-of: negative: transform', (t) => {
    t.transform('for-in');
    t.end();
});

test('plugin-convert-for-to-for-of: negative: no transform: for-in-body', (t) => {
    t.transform('for-in-body');
    t.end();
});

test('plugin-convert-for-to-for-of: negative: no transform: no-has-own', (t) => {
    t.noTransform('no-has-own');
    t.end();
});

