'use strict';

const {createTest} = require('@putout/test');
const montag = require('montag');
const removeEmptyPattern = require('.');
const test = createTest(__dirname, {
    'remove-empty-pattern': removeEmptyPattern,
});

test('plugin-remove-empty: pattern: report: object', (t) => {
    t.reportCode('const {} = obj', 'Avoid empty patterns');
    t.end();
});

test('plugin-remove-empty: pattern: report: array', (t) => {
    t.reportCode('const [] = array', 'Avoid empty patterns');
    t.end();
});

test('plugin-remove-empty: pattern: report: array: many elements', (t) => {
    t.reportCode('const [,,,] = array', 'Avoid empty patterns');
    t.end();
});

test('plugin-remove-empty: pattern: object', (t) => {
    t.transformCode('const {} = object', '');
    t.end();
});

test('plugin-remove-empty: pattern: array', (t) => {
    t.transformCode('const [] = array', '');
    t.end();
});

test('plugin-remove-empty: pattern: let', (t) => {
    t.transformCode(montag`
        let [,,,] = x;
        let {} = y;
    `, '');
    t.end();
});

test('plugin-remove-empty: pattern: assignment', (t) => {
    t.transformCode(montag`
        [,,,] = x;
        ({} = y);
    `, '');
    t.end();
});

test('plugin-remove-empty: pattern: transform: array: many elements', (t) => {
    t.transformCode('const [,,,] = array', '');
    t.end();
});

test('plugin-remove-empty: pattern: argument: object destructuring', (t) => {
    t.transformCode('({}) => alert()', '() => alert();');
    t.end();
});

test('plugin-remove-empty: pattern: argument: array destructuring', (t) => {
    t.transformCode('([]) => alert()', '() => alert();');
    t.end();
});

test('plugin-remove-empty: pattern: argument: couple-empty', (t) => {
    t.transformCode('([,,,]) => alert()', '() => alert();');
    t.end();
});

test('plugin-remove-empty: pattern: argument: object destructuring: not empty', (t) => {
    t.noTransformCode('({a}) => alert()');
    t.end();
});

test('plugin-remove-empty: pattern: argument: array destructuring: not empty', (t) => {
    t.noTransformCode('([a]) => alert()');
    t.end();
});

test('plugin-remove-empty: pattern: destructuring: not empty: many', (t) => {
    t.noTransformCode('const [, b] = alert()');
    t.end();
});

test('plugin-remove-empty: pattern: transform: nested array destructuring', (t) => {
    t.transformCode('const [, {}] = getOptions()', '');
    t.end();
});

test('plugin-remove-empty: pattern: transform: nested array destructuring: array', (t) => {
    t.transformCode('const [, []] = getOptions()', '');
    t.end();
});

test('plugin-remove-empty: pattern: no transform: nested array destructuring', (t) => {
    t.noTransformCode('const [{rule}] = options');
    t.end();
});

test('plugin-remove-empty: pattern: transform: fn', (t) => {
    t.transform('fn');
    t.end();
});

test('plugin-remove-empty: pattern: transform: no-args', (t) => {
    t.noReport('no-args');
    t.end();
});

