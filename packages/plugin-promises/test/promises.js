'use strict';

const test = require('@putout/test')(__dirname, {
    promises: require('..'),
});

test('plugin-promises: transform: report', (t) => {
    t.report('await', 'Async functions should be called using await');
    t.end();
});

test('plugin-promises: transform: export', (t) => {
    t.transform('await');
    t.end();
});

test('plugin-promises: transform: add missing await', (t) => {
    t.transform('async');
    t.end();
});

