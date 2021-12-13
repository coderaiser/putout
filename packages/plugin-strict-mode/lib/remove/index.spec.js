'use strict';

const {createTest} = require('@putout/test');
const remove = require('.');

const test = createTest(__dirname, {
    'strict-mode/remove': remove,
});

test('plugin-strict-mode: remove: report', (t) => {
    t.report('esm', '"use strict" is redundant is esm');
    t.end();
});

test('plugin-strict-mode: remove: transform: esm', (t) => {
    t.transform('esm');
    t.end();
});

test('plugin-strict-mode: transform: commonjs', (t) => {
    t.transform('commonjs');
    t.end();
});

test('plugin-strict-mode: remove: export all', (t) => {
    t.transform('export-all');
    t.end();
});

test('plugin-strict-mode: remove: transform: top-level-await', (t) => {
    t.transform('top-level-await');
    t.end();
});

