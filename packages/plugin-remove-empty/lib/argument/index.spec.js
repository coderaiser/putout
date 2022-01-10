'use strict';

const {createTest} = require('@putout/test');
const removeEmptyArgument = require('.');

const test = createTest(__dirname, {
    'remove-empty-argument': removeEmptyArgument,
});

test('plugin-remove-empty: argument: report', (t) => {
    t.report('arg', 'Empty argument should be avoided');
    t.end();
});

test('plugin-remove-empty: no report: argument: object', (t) => {
    t.transform('arg');
    t.end();
});

test('plugin-remove-empty: no report: argument: array', (t) => {
    t.transform('array');
    t.end();
});

