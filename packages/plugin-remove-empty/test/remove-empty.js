'use strict';

const removeConsole = require('..');
const test = require('@putout/test')(__dirname, {
    'remove-empty': removeConsole
});

test('plugin-remove-empty: report', (t) => {
    t.report('not-function', 'Empty block statement');
    t.end();
});

test('plugin-remove-empty: function', (t) => {
    t.transform('function');
    t.end();
});

test('plugin-remove-empty: not function', (t) => {
    t.transform('not-function');
    t.end();
});

