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

test('plugin-convert-for-to-for-of: no transform: more i references', (t) => {
    t.noTransform('for-more');
    t.end();
});

