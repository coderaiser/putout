'use strict';

/* eslint node/no-unpublished-require:0 */
const removeEmptyBlock = require('.');
const test = require('@putout/test')(__dirname, {
    'remove-empty-block': removeEmptyBlock,
});

test('plugin-remove-empty: block: report', (t) => {
    t.report('not-function', 'Empty block statement');
    t.end();
});

test('plugin-remove-empty: block: function', (t) => {
    t.transform('function');
    t.end();
});

test('plugin-remove-empty: block: not function', (t) => {
    t.transform('not-function');
    t.end();
});

