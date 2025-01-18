'use strict';

const {createTest} = require('@putout/test');
const addArgs = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['tape/add-args', addArgs],
    ],
});

test('plugin-tape: add-args: transform: t', (t) => {
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

test('plugin-tape: add-args: no transform: upper-scope', (t) => {
    t.noTransform('upper-scope');
    t.end();
});
