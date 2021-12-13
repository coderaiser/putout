'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');
const test = createTest(__dirname, {
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

