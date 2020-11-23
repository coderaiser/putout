'use strict';

const test = require('@putout/test')(__dirname, {
    'regexp/simplify': require('.'),
});

test('plugin-regexp/simplify: report', (t) => {
    t.reportCode(`new RegExp('hello')`, 'Literal notation of RegExp should be used');
    t.end();
});

test('plugin-regexp/simplify: transform: one argument', (t) => {
    t.transformCode(`RegExp('hello')`, '/hello/;');
    t.end();
});

test('plugin-regexp/simplify: transform: one argument and new', (t) => {
    t.transformCode(`new RegExp('hello')`, '/hello/;');
    t.end();
});
test('plugin-regexp/simplify: transform: two arguments', (t) => {
    t.transformCode(`RegExp('hello', 'g')`, '/hello/g;');
    t.end();
});

test('plugin-regexp/simplify: transform: two arguments and new', (t) => {
    t.transformCode(`new RegExp('hello', 'g')`, '/hello/g;');
    t.end();
});

test('plugin-regexp/simplify: no transform: template literal', (t) => {
    t.noTransformCode(`new RegExp(\`hello\`, 'g')`);
    t.end();
});

test('plugin-regexp/simplify: transform: /', (t) => {
    t.transformCode(`RegExp('/', 'g')`, '/\\//g;');
    t.end();
});

