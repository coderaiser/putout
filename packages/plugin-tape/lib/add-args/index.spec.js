'use strict';

const {createTest} = require('@putout/test');
const addArgs = require('.');

const test = createTest(__dirname, {
    'tape/add-args': addArgs,
});

test('plugin-tape: add-args: report', (t) => {
    t.report('t', 'Argument "t" is missing');
    t.end();
});

test('plugin-tape: add-args: transform', (t) => {
    t.transform('t');
    t.end();
});

test('plugin-tape: add-args: transform: async', (t) => {
    t.transform('async');
    t.end();
});

test('plugin-tape: add-args: transform: only', (t) => {
    t.transform('only');
    t.end();
});

test('plugin-tape: add-args: transform: skip', (t) => {
    t.transform('skip');
    t.end();
});

test('plugin-tape: add-args: no transform', (t) => {
    t.noTransform('upper-scope');
    t.end();
});

