'use strict';

const {createTest} = require('@putout/test');
const removeUselessForOf = require('.');

const test = createTest(__dirname, {
    'remove-useless-for-of': removeUselessForOf,
});

test('plugin-remove-useless-for-of: report', (t) => {
    t.report('empty', 'Avoid useless for-of');
    t.end();
});

test('plugin-remove-useless-for-of: transform', (t) => {
    t.transform('empty', '\n');
    t.end();
});

test('plugin-remove-useless-for-of: transform: one', (t) => {
    t.transform('one');
    t.end();
});

test('plugin-remove-useless-for-of: no transform: many', (t) => {
    t.noTransform('many');
    t.end();
});

test('plugin-remove-useless-for-of: no transform: not identifier', (t) => {
    t.noTransform('not-id');
    t.end();
});

test('plugin-remove-useless-for-of: no transform: refs', (t) => {
    t.noTransform('refs');
    t.end();
});

test('plugin-remove-useless-for-of: transform: no refs', (t) => {
    t.transform('no-refs');
    t.end();
});

test('plugin-remove-useless-for-of: transform: unused', (t) => {
    t.transform('unused');
    t.end();
});

