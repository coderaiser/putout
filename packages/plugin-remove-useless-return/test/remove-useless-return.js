'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-useless-return': require('..'),
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

test('plugin-remove-useless-return: transform: await', (t) => {
    t.noTransform('await');
    t.end();
});

test('plugin-remove-useless-return: no transform: fn-call', (t) => {
    t.noTransform('fn-call');
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

test('plugin-remove-useless-return: no transform: no-return', (t) => {
    t.noTransform('no-return');
    t.end();
});

test('plugin-remove-useless-return: no transform: comment', (t) => {
    t.noTransform('comment');
    t.end();
});

