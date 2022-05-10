'use strict';

const {createTest} = require('@putout/test');
const addArgs = require('.');

const test = createTest(__dirname, {
    'putout/add-args': addArgs,
});

test('plugin-putout: add-args: report', (t) => {
    t.report('compare-places', 'Argument "comparePlaces" is missing');
    t.end();
});

test('plugin-putout: add-args: transform', (t) => {
    t.transform('compare-places');
    t.end();
});

test('plugin-putout: add-args: process', (t) => {
    t.transform('process');
    t.end();
});

test('plugin-putout: add-args: no transform: has binding', (t) => {
    t.noTransform('has-binding');
    t.end();
});

test('plugin-putout: add-args: no transform: not-test', (t) => {
    t.noTransform('not-test');
    t.end();
});

