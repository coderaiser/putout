'use strict';

const removeUnreferencedVariables = require('..');

const test = require('@putout/test')(__dirname, {
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

test('plugin-remove-unreferenced-variables: no transform', (t) => {
    t.noTransform('referenced');
    t.end();
});

test('plugin-remove-unreferenced-variables: no transform: not declared', (t) => {
    t.noTransform('not-declared');
    t.end();
});

