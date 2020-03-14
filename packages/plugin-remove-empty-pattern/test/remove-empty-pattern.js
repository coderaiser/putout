'use strict';

const removeConsole = require('..');
const test = require('@putout/test')(__dirname, {
    'remove-empty-pattern': removeConsole,
});

test('plugin-remove-empty-pattern: report: object', (t) => {
    t.reportCode('const {} = obj', 'Empty pattern');
    t.end();
});

test('plugin-remove-empty-pattern: report: array', (t) => {
    t.reportCode('const [] = array', 'Empty pattern');
    t.end();
});

test('plugin-remove-empty-pattern: object', (t) => {
    t.transformCode('const {} = object;', 'object;');
    t.end();
});

test('plugin-remove-empty-pattern: array', (t) => {
    t.transformCode('const [] = array', 'array;');
    t.end();
});

test('plugin-remove-empty-pattern: argument: object destructuring', (t) => {
    t.transformCode('({}) => alert()', '() => alert();');
    t.end();
});

test('plugin-remove-empty-pattern: argument: array destructuring', (t) => {
    t.transformCode('([]) => alert()', '() => alert();');
    t.end();
});

test('plugin-remove-empty-pattern: argument: object destructuring: not empty', (t) => {
    t.noTransformCode('({a}) => alert()');
    t.end();
});

test('plugin-remove-empty-pattern: argument: array destructuring: not empty', (t) => {
    t.noTransformCode('([a]) => alert()');
    t.end();
});
