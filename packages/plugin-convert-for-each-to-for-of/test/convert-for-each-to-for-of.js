'use strict';

const test = require('@putout/test')(__dirname, {
    'convert-for-each-to-for-of': require('..'),
});

test('plugin-convert-for-each-to-for-of: report', (t) => {
    t.report('keys', 'for-of should be used instead of forEach');
    t.end();
});

test('plugin-convert-for-each-to-for-of: transform', (t) => {
    t.transform('keys');
    t.end();
});

test('plugin-convert-for-each-to-for-of: transform: not function', (t) => {
    t.noTransform('not-fn');
    t.end();
});
