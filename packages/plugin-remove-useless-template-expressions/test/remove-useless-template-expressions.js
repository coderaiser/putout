'use strict';

const {createTest} = require('@putout/test');
const removeUselessTemplateExpressions = require('..');

const test = createTest(__dirname, {
    'remove-useless-template-expressions': removeUselessTemplateExpressions,
});

test('plugin-remove-useless-template-expressions: report', (t) => {
    t.report('literal', 'Avoid useless template expressions');
    t.end();
});

test('plugin-remove-useless-template-expressions: transform: literal', (t) => {
    t.transform('literal');
    t.end();
});

test('plugin-remove-useless-template-expressions: transform: var', (t) => {
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

test('plugin-remove-useless-template-expressions: no transform: contains quasis', (t) => {
    t.noTransform('contains-quasis');
    t.end();
});

