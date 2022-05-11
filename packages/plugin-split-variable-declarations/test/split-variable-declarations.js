'use strict';

const {createTest} = require('@putout/test');
const splitVariableDeclarations = require('..');
const removeUnusedVariables = require('@putout/plugin-remove-unused-variables');

const test = createTest(__dirname, {
    'split-variable-declarations': splitVariableDeclarations,
});

test('plugin-split-variable-declarations: report', (t) => {
    t.report('split-variable-declarations', 'Variables should be declared separately');
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

test('plugin-split-variable-declarations: transform: comment', (t) => {
    t.transform('comment');
    t.end();
});

test('plugin-split-variable-declarations: no transform: export', (t) => {
    t.noTransform('export');
    t.end();
});

test('plugin-split-variable-declarations: null literal: loc', (t) => {
    t.transform('null-literal', '\n\n', {
        'remove-unused-variables': removeUnusedVariables,
    });
    t.end();
});

