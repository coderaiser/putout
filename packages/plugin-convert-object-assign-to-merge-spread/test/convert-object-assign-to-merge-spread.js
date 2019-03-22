'use strict';

const test = require('@putout/test')(__dirname, {
    'convert-object-assign-to-merge-spread': require('..'),
});

test('plugin-convert-object-assign-to-merge-spread: report', (t) => {
    t.report('object', 'Merge spread should be used instead of Object.assign');
    t.end();
});

test('plugin-convert-object-assign-to-merge-spread: transform', (t) => {
    t.transform('object');
    t.end();
});

test('plugin-convert-object-assign-to-merge-spread: transform: call', (t) => {
    t.noTransform('call');
    t.end();
});

test('plugin-convert-object-assign-to-merge-spread: transform: first', (t) => {
    t.noTransform('first');
    t.end();
});

