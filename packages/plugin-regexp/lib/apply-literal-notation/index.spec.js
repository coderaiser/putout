'use strict';

const test = require('@putout/test')(__dirname, {
    'regexp/apply-literal-notation': require('.'),
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

