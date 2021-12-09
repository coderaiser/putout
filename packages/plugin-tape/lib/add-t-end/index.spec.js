'use strict';

const addTEnd = require('.');

const test = require('@putout/test')(__dirname, {
    'tape/add-t-end': addTEnd,
});

test('plugin-tape: add-t-end: report', (t) => {
    t.report('t-end', `'t.end()' is missing at the end of the test`);
    t.end();
});

test('plugin-tape: add-t-end: transform', (t) => {
    t.transform('t-end');
    t.end();
});

test('plugin-tape: add-t-end: transform: not-empty', (t) => {
    t.transform('not-empty');
    t.end();
});

test('plugin-tape: add-t-end: transform: async', (t) => {
    t.transform('async');
    t.end();
});

test('plugin-tape: add-t-end: no transform: contains', (t) => {
    t.noTransform('contains');
    t.end();
});
