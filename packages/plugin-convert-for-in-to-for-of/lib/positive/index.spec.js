'use strict';

const test = require('@putout/test')(__dirname, {
    'convert-for-in-to-for-of': require('.'),
});

test('plugin-convert-for-in-to-for-of: positive: report', (t) => {
    t.report('for-in', 'for-of should be used instead of for-in');
    t.end();
});

test('plugin-convert-for-in-to-for-of: positive: transform', (t) => {
    t.transform('for-in');
    t.end();
});

test('plugin-convert-for-in-to-for-of: positive: transform: no hasOwnProperty', (t) => {
    t.noTransform('no-has-own');
    t.end();
});

test('plugin-convert-for-in-to-for-of: positive: transform: no var', (t) => {
    t.noTransform('no-var');
    t.end();
});
