'use strict';

const {createTest} = require('@putout/test');
const applyLiteralNotation = require('.');
const removeUselessGroup = require('../remove-useless-group');
const removeUselessEscape = require('@putout/plugin-remove-useless-escape');

const test = createTest(__dirname, {
    'regexp/apply-literal-notation': applyLiteralNotation,
});

test('plugin-regexp/apply-literal-notation: report', (t) => {
    t.reportCode(`new RegExp('hello')`, 'Literal notation of RegExp should be used');
    t.end();
});

test('plugin-regexp/apply-literal-notation: transform: one argument', (t) => {
    t.transformCode(`RegExp('hello')`, '/hello/;');
    t.end();
});

test('plugin-regexp/apply-literal-notation: transform: one argument and new', (t) => {
    t.transformCode(`new RegExp('hello')`, '/hello/;');
    t.end();
});

test('plugin-regexp/apply-literal-notation: transform: two arguments', (t) => {
    t.transformCode(`RegExp('hello', 'g')`, '/hello/g;');
    t.end();
});

test('plugin-regexp/apply-literal-notation: transform: two arguments and new', (t) => {
    t.transformCode(`new RegExp('hello', 'g')`, '/hello/g;');
    t.end();
});

test('plugin-regexp/apply-literal-notation: no transform: template literal', (t) => {
    t.noTransformCode(`new RegExp(\`hello\`, 'g')`);
    t.end();
});

test('plugin-regexp/apply-literal-notation: transform: /', (t) => {
    t.transformCode(`RegExp('/', 'g')`, '/\\//g;');
    t.end();
});

test('plugin-regexp/apply-literal-notation: transform: \\', (t) => {
    t.transformCode(
        `output.match(new RegExp('<div><span> {10}</span></div>', 'g'))`,
        `output.match(/<div><span> {10}<\\/span><\\/div>/g)`,
    );
    t.end();
});

test('plugin-regexp/apply-literal-notation: transform: remove-useless-group', (t) => {
    t.noReportAfterTransform('remove-useless-group', {
        'regexp/remove-useless-group': removeUselessGroup,
    });
    t.end();
});

test('plugin-regexp/apply-literal-notation: transform: remove-useless-escape', (t) => {
    t.transform('remove-useless-escape', {
        'remove-useless-escape': removeUselessEscape,
    });
    t.end();
});

