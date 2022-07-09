'use strict';

const {createTest} = require('@putout/test');
const removeUnreferencedVariables = require('..');

const test = createTest(__dirname, {
    'remove-unreferenced-variables': removeUnreferencedVariables,
});

test('plugin-remove-unreferenced-variables: report', (t) => {
    t.report('unreferenced', 'Unreferenced variables should be avoided');
    t.end();
});

test('plugin-remove-unreferenced-variables: transform', (t) => {
    t.transform('unreferenced', '\n');
    t.end();
});

test('plugin-remove-unreferenced-variables: transform: destr', (t) => {
    t.transform('destr');
    t.end();
});

test('plugin-remove-unreferenced-variables: transform: destr-rename', (t) => {
    t.transform('destr-rename');
    t.end();
});

test('plugin-remove-unreferenced-variables: transform: upper-scope', (t) => {
    t.transform('upper-scope');
    t.end();
});

test('plugin-remove-unreferenced-variables: no transform', (t) => {
    t.noTransform('referenced');
    t.end();
});

test('plugin-remove-unreferenced-variables: no transform: not declared', (t) => {
    t.noTransform('not-declared');
    t.end();
});

