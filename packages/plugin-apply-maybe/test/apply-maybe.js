'use strict';

const {createTest} = require('@putout/test');
const applyMaybe = require('..');

const test = createTest(__dirname, {
    applyMaybe,
});

test('plugin-apply-maybe: transform: fn', (t) => {
    t.transform('fn');
    t.end();
});

test('plugin-apply-maybe: transform: array', (t) => {
    t.transform('array');
    t.end();
});

test('plugin-apply-maybe: transform: empty-array', (t) => {
    t.transform('empty-array');
    t.end();
});

test('plugin-apply-maybe: transform: noop', (t) => {
    t.transform('noop');
    t.end();
});
