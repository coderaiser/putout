'use strict';

const {createTest} = require('@putout/test');
const conditions = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['conditions', conditions],
    ],
});

test('plugin-conditions: transform: apply-comparison-order', (t) => {
    t.transform('apply-comparison-order');
    t.end();
});

test('plugin-conditions: transform: apply-consistent-blocks', (t) => {
    t.transform('apply-consistent-blocks');
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

test('plugin-conditions: transform: remove-zero', (t) => {
    t.transform('remove-zero');
    t.end();
});

test('plugin-conditions: transform: remove-useless-else', (t) => {
    t.transform('remove-useless-else');
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

test('plugin-conditions: transform: merge-if-statements', (t) => {
    t.transform('merge-if-statements');
    t.end();
});

test('plugin-conditions: transform: remove-same-values-condition', (t) => {
    t.transform('remove-same-values-condition');
    t.end();
});

test('plugin-conditions: transform: add-return', (t) => {
    t.transform('add-return');
    t.end();
});

test('plugin-conditions: transform: convert-arrow-to-condition', (t) => {
    t.transform('convert-arrow-to-condition');
    t.end();
});
