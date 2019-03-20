'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-constant-conditions': require('..'),
});

test('plugin-remove-constant-conditions: report', (t) => {
    t.report('positive', 'constant conditions should not be used');
    t.end();
});

test('plugin-remove-constant-conditions: transform: positive', (t) => {
    t.transform('positive');
    t.end();
});

test('plugin-remove-constant-conditions: transform: negative', (t) => {
    t.transform('negative', '\n');
    t.end();
});

test('plugin-remove-constant-conditions: transform: identifier', (t) => {
    t.noTransform('identifier');
    t.end();
});

test('plugin-remove-constant-conditions: transform: else', (t) => {
    t.noTransform('else');
    t.end();
});
