'use strict';

const {createTest} = require('@putout/test');
const conditions = require('..');

const test = createTest(__dirname, {
    conditions,
});

test('plugin-conditions: transform: apply-comparison-order', (t) => {
    t.transform('apply-comparison-order');
    t.end();
});

test('plugin-conditions: transform: apply-if', (t) => {
    t.transform('apply-if');
    t.end();
});

test('plugin-conditions: transform: convert-comparison-to-boolean', (t) => {
    t.transform('convert-comparison-to-boolean');
    t.end();
});

test('plugin-conditions: transform: convert-equal-to-strict-equal', (t) => {
    t.transform('convert-equal-to-strict-equal');
    t.end();
});

test('plugin-conditions: transform: remove-boolean', (t) => {
    t.transform('remove-boolean');
    t.end();
});

test('plugin-conditions: transform: evaluate', (t) => {
    t.transform('evaluate');
    t.end();
});

test('plugin-conditions: transform: simplify', (t) => {
    t.transform('simplify');
    t.end();
});
