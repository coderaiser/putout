'use strict';

const promises = require('..');

const test = require('@putout/test')(__dirname, {
    promises,
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

test('plugin-promises: transform: return-useless-async', (t) => {
    t.transform('remove-useless-async');
    t.end();
});

test('plugin-promises: transform: return-useless-await', (t) => {
    t.transform('remove-useless-await');
    t.end();
});

test('plugin-promises: transform: apply-top-level-await', (t) => {
    t.transform('apply-top-level-await');
    t.end();
});

