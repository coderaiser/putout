'use strict';

const splitVariableDeclarations = require('..');
const test = require('@putout/test')(__dirname, {
    'split-variable-declarations': splitVariableDeclarations,
});

test('plugin-split-variable-declarations: report', (t) => {
    t.report('split-variable-declarations', 'variables should be declared separately');
    t.end();
});

test('plugin-split-variable-declarations: transform', (t) => {
    t.transform('split-variable-declarations');
    t.end();
});

test('plugin-split-variable-declarations: transform: for-statement', (t) => {
    t.transform('for-statement');
    t.end();
});

test('plugin-split-variable-declarations: null literal', (t) => {
    t.transform('null-literal');
    t.end();
});
