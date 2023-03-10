'use strict';

const {createTest} = require('@putout/test');
const removeUselessTypeConversion = require('.');

const test = createTest(__dirname, {
    'remove-useless-type-conversion': removeUselessTypeConversion,
});

test('plugin-remove-useless-type-conversion: named: report', (t) => {
    t.report('bool', 'Avoid useless type conversion');
    t.end();
});

test('plugin-remove-useless-type-conversion: named: transform', (t) => {
    t.transform('bool');
    t.end();
});

test('plugin-remove-useless-type-conversion: named: transform: typeof', (t) => {
    t.transform('typeof');
    t.end();
});

test('plugin-remove-useless-type-conversion: named: transform: if', (t) => {
    t.transform('if');
    t.end();
});

test('plugin-remove-useless-type-conversion: named: transform: while', (t) => {
    t.transform('while');
    t.end();
});

test('plugin-remove-useless-type-conversion: named: transform: for', (t) => {
    t.transform('for');
    t.end();
});

test('plugin-remove-useless-type-conversion: named: transform: for-start', (t) => {
    t.transform('for-start');
    t.end();
});

test('plugin-remove-useless-type-conversion: named: transform: for-end', (t) => {
    t.transform('for-end');
    t.end();
});
