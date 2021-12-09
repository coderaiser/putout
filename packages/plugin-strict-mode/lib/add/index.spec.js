'use strict';

const add = require('.');

process.on('unhandledRejection', () => {});

const test = require('@putout/test')(__dirname, {
    'strict-mode/add': add,
});

test('plugin-strict-mode: add: report', (t) => {
    t.report('commonjs', '"use strict" directive should be on top of commonjs file');
    t.end();
});

test('plugin-strict-mode: add: commonjs', (t) => {
    t.transform('commonjs');
    t.end();
});

test('plugin-strict-mode: add: strict', (t) => {
    t.transform('strict');
    t.end();
});

test('plugin-strict-mode: add: import', (t) => {
    t.transform('import');
    t.end();
});

test('plugin-strict-mode: add: no transform: flow', (t) => {
    t.noTransform('flow');
    t.end();
});

test('plugin-strict-mode: add: no transform: export-all', (t) => {
    t.noTransform('export-all');
    t.end();
});

test('plugin-strict-mode: add: no transform: top-level-await', (t) => {
    t.noTransform('top-level-await');
    t.end();
});

