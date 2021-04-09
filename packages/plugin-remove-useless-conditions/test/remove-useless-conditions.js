'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-useless-conditions': require('..'),
});

test('plugin-remove-useless-conditions: report', (t) => {
    t.report('conditions', 'Useless conditions should be avoided');
    t.end();
});

test('plugin-remove-useless-conditions: transform: array', (t) => {
    t.transform('conditions');
    t.end();
});

test('plugin-remove-useless-conditions: transform: duplicate', (t) => {
    t.transform('duplicate');
    t.end();
});

