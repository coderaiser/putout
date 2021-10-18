'use strict';

const removeSkip = require('..');
const test = require('@putout/test')(__dirname, {
    'remove-skip': removeSkip,
});

test('plugin-remove-skip: report', (t) => {
    t.report('skip', '"test.skip" should not be used');
    t.end();
});

test('plugin-remove-skip: transform', (t) => {
    t.transform('skip');
    t.end();
});

test('plugin-remove-skip: transform: options', (t) => {
    t.transform('options');
    t.end();
});

test('plugin-remove-skip: transform: skip-skip', (t) => {
    t.transform('skip-skip');
    t.end();
});

test('plugin-remove-skip: transform: not top level', (t) => {
    t.noTransform('not-top-level');
    t.end();
});

