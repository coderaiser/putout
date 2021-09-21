'use strict';

const convert = require('.');
const test = require('@putout/test')(__dirname, {
    'tape/remove-useless-not-called-args': convert,
});

test('plugin-tape: remove-useless-not-called-args: report: args', (t) => {
    t.report('args', 'Remove useless "notCalled" args');
    t.end();
});

test('plugin-tape: remove-useless-not-called-args: transform: args', (t) => {
    t.transform('args');
    t.end();
});

