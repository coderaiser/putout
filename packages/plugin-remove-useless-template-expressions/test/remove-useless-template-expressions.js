'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-useless-template-expressions': require('..'),
});

test('plugin-remove-useless-template-expressions: report', (t) => {
    t.report('literal', 'Avoid useless template expressions');
    t.end();
});

test('plugin-remove-useless-template-expressions: transform', (t) => {
    t.transform('literal');
    t.end();
});

test('plugin-remove-useless-template-expressions: transform', (t) => {
    t.transform('var');
    t.end();
});

test('plugin-remove-useless-template-expressions: no transform: var: only', (t) => {
    t.noTransform('var-only');
    t.end();
});

test('plugin-remove-useless-template-expressions: no transform: comments', (t) => {
    t.noTransform('comments');
    t.end();
});

