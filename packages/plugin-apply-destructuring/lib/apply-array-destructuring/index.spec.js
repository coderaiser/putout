'use strict';

const applyDestructuring = require('.');

/* eslint node/no-unpublished-require:0 */
const test = require('@putout/test')(__dirname, {
    'apply-array-destructuring': applyDestructuring,
});

test('plugin-apply-destructuring: report: array: report', (t) => {
    t.report('assignment', 'Array destructuring should be used for "a"');
    t.end();
});

test('plugin-apply-destructuring: report: array: report', (t) => {
    t.report('variable-declarator', 'Array destructuring should be used for "a"');
    t.end();
});

test('plugin-apply-destructuring: transform: array: variable-declarator', (t) => {
    t.transform('variable-declarator');
    t.end();
});

test('plugin-apply-destructuring: transform: array: assignment', (t) => {
    t.transform('assignment');
    t.end();
});

