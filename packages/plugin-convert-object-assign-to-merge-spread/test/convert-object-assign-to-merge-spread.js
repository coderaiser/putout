'use strict';

const {createTest} = require('@putout/test');
const convertObjectAssignToMergeSpread = require('..');

const test = createTest(__dirname, {
    'convert-object-assign-to-merge-spread': convertObjectAssignToMergeSpread,
});

test('plugin-convert-object-assign-to-merge-spread: report', (t) => {
    t.report('object', `Use merge spread instead of 'Object.assign()'`);
    t.end();
});

test('plugin-convert-object-assign-to-merge-spread: transform', (t) => {
    t.transform('object');
    t.end();
});

test('plugin-convert-object-assign-to-merge-spread: transform: create', (t) => {
    t.transform('create');
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

test('plugin-convert-object-assign-to-merge-spread: transform: spread', (t) => {
    t.noTransform('spread');
    t.end();
});

test('plugin-convert-object-assign-to-merge-spread: transform: empty', (t) => {
    t.noTransform('empty');
    t.end();
});

