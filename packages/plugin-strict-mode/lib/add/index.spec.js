'use strict';

process.on('unhandledRejection', () => {});

/* eslint node/no-unpublished-require:0 */
const test = require('@putout/test')(__dirname, {
    'strict-mode/add': require('.'),
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

