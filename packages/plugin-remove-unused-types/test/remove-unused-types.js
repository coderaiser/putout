'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-useless-types': require('..'),
});

test('remove usless types: report', (t) => {
    t.report('unused', '"Point" is defined but never used');
    t.end();
});

test('remove usless types: transform', (t) => {
    t.transform('unused', '\n\n');
    t.end();
});

test('remove usless types: no transform: used', (t) => {
    t.noTransform('used');
    t.end();
});

test('remove usless types: no transform: not defined', (t) => {
    t.noTransform('not-defined');
    t.end();
});

