'use strict';

const removeUselessArguments = require('..');

const test = require('@putout/test')(__dirname, {
    'remove-useless-arguments': removeUselessArguments,
});

test('plugin-remove-useless-arguments: report', (t) => {
    t.report('call', '"generate" is useless argument of a function "onIfStatement"');
    t.end();
});

test('plugin-remove-useless-arguments: transform: call', (t) => {
    t.transform('call');
    t.end();
});

test('plugin-remove-useless-arguments: transform: scope', (t) => {
    t.transform('scope');
    t.end();
});

test('plugin-remove-useless-arguments: transform: different values', (t) => {
    t.transform('diff-values');
    t.end();
});

test('plugin-remove-useless-arguments: transform: arg', (t) => {
    t.transform('arg');
    t.end();
});

test('plugin-remove-useless-arguments: transform: no args', (t) => {
    t.transform('no-args');
    t.end();
});

test('plugin-remove-useless-arguments: no transform: not object', (t) => {
    t.noTransform('not-object');
    t.end();
});

test('plugin-remove-useless-arguments: no transform: deep', (t) => {
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

