'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-unreachable-code': require('..'),
});

test('plugin-remove-unreachable-code: report', (t) => {
    t.report('return', 'Unreachable code');
    t.end();
});

test('plugin-remove-unreachable-code: transform', (t) => {
    t.transform('return');
    t.end();
});

test('plugin-remove-unreachable-code: transform', (t) => {
    t.transform('throw');
    t.end();
});
