'use strict';

const {createTest} = require('@putout/test');
const removeUnreferencedVariables = require('..');
const mergeVariables = require('@putout/plugin-minify').rules['merge-variables'];
const forOfReduce = require('@putout/plugin-for-of').rules.reduce;

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-unreferenced-variables', removeUnreferencedVariables],
    ],
});

test('plugin-remove-unreferenced-variables: report', (t) => {
    t.report('unreferenced', 'Avoid unreferenced variables');
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

test('plugin-remove-unreferenced-variables: transform: no-init', (t) => {
    t.transform('no-init');
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

test('plugin-remove-unreferenced-variables: transform: merge-variables', (t) => {
    t.transform('merge-variables', {
        'minify/merge-variables': mergeVariables,
    });
    t.end();
});

test('plugin-remove-unreferenced-variables: transform: for-of/reduce', (t) => {
    t.transform('for-of-reduce', {
        'for-of/reduce': forOfReduce,
    });
    t.end();
});
