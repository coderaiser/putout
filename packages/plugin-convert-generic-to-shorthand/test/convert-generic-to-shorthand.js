'use strict';

const test = require('@putout/test')(__dirname, {
    'convert-generic-to-shorthand': require('..'),
});

test('plugin-convert-generic-to-shorthand: report', (t) => {
    t.report('array', 'Shorthand [] should be used instead of Array');
    t.end();
});

test('plugin-convert-generic-to-shorthand: transform', (t) => {
    t.transform('array');
    t.end();
});

test('plugin-convert-generic-to-shorthand: transform', (t) => {
    t.noTransform('multiple');
    t.end();
});

