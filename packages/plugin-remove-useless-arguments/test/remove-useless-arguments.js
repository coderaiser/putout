'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-useless-arguments': require('..'),
});

test('plugin-remove-useless-arguments: report', (t) => {
    t.report('call', '"generate" is useless argument of a function "onIfStatement"');
    t.end();
});

test('plugin-remove-useless-arguments: transform', (t) => {
    t.transform('call');
    t.end();
});

test('plugin-remove-useless-arguments: transform', (t) => {
    t.transform('scope');
    t.end();
});

test('plugin-remove-useless-arguments: no transform: different values', (t) => {
    t.transform('diff-values');
    t.end();
});

test('plugin-remove-useless-arguments: no transform: not object', (t) => {
    t.noTransform('not-object');
    t.end();
});

test('plugin-remove-useless-arguments: no transform: not object', (t) => {
    t.noTransform('deep');
    t.end();
});

test('plugin-remove-useless-arguments: no transform: no declaration', (t) => {
    t.noTransform('no-declaration');
    t.end();
});

test('plugin-remove-useless-arguments: no transform: not defined', (t) => {
    t.noTransform('not-defined');
    t.end();
});

