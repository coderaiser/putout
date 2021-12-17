'use strict';

const {createTest} = require('@putout/test');
const removeUselessReturn = require('..');

const test = createTest(__dirname, {
    'remove-useless-return': removeUselessReturn,
});

test('plugin-remove-useless-return: report', (t) => {
    t.report('return', 'Avoid useless "return"');
    t.end();
});

test('plugin-remove-useless-return: transform', (t) => {
    t.transform('return');
    t.end();
});

test('plugin-remove-useless-return: transform: export', (t) => {
    t.transform('export');
    t.end();
});

test('plugin-remove-useless-return: transform: declaration', (t) => {
    t.transform('declaration');
    t.end();
});

test('plugin-remove-useless-return: transform: logic', (t) => {
    t.transform('logic');
    t.end();
});

test('plugin-remove-useless-return: transform: no-args', (t) => {
    t.transform('no-args');
    t.end();
});

test('plugin-remove-useless-return: transform: chain-call', (t) => {
    t.noTransform('chain-call');
    t.end();
});

test('plugin-remove-useless-return: transform: await', (t) => {
    t.noTransform('await');
    t.end();
});

test('plugin-remove-useless-return: no transform: new', (t) => {
    t.noTransform('new');
    t.end();
});

test('plugin-remove-useless-return: no transform: str', (t) => {
    t.noTransform('str');
    t.end();
});

test('plugin-remove-useless-return: no transform: not-empty-call', (t) => {
    t.noTransform('not-empty-call');
    t.end();
});

test('plugin-remove-useless-return: no transform: no-return', (t) => {
    t.noTransform('no-return');
    t.end();
});

test('plugin-remove-useless-return: no transform: comment', (t) => {
    t.noTransform('comment');
    t.end();
});

