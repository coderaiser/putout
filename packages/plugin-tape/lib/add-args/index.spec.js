'use strict';

const addArgs = require('.');

const test = require('@putout/test')(__dirname, {
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

test('plugin-tape: add-args: no transform', (t) => {
    t.noTransform('upper-scope');
    t.end();
});

