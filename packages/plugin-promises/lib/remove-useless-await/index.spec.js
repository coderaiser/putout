'use strict';

const {createTest} = require('@putout/test');
const removeUselessAwait = require('.');

const test = createTest(__dirname, {
    'remove-useless-await': removeUselessAwait,
});

test('plugin-remove-useless-await: report', (t) => {
    t.report('await-await', `Avoid useless 'await'`);
    t.end();
});

test('plugin-remove-useless-await: transform', (t) => {
    t.transform('await-await');
    t.end();
});

test('plugin-remove-useless-await: transform: not async', (t) => {
    t.transform('not-async');
    t.end();
});

test('plugin-remove-useless-await: transform: no call', (t) => {
    t.noTransform('no-call');
    t.end();
});

test('plugin-remove-useless-await: transform: no declaration', (t) => {
    t.noTransform('no-declaration');
    t.end();
});

test('plugin-remove-useless-await: no transform: promise', (t) => {
    t.noTransform('promise');
    t.end();
});

test('plugin-remove-useless-await: no transform: resolve', (t) => {
    t.noTransform('resolve');
    t.end();
});

test('plugin-remove-useless-await: transform: not fn', (t) => {
    t.noTransform('not-fn');
    t.end();
});

test('plugin-remove-useless-await: transform: callee not identifier', (t) => {
    t.noTransform('callee-not-identifier');
    t.end();
});

test('plugin-remove-useless-await: transform: type-promise', (t) => {
    t.transform('type-promise');
    t.end();
});

test('plugin-remove-useless-await: transform: primitive', (t) => {
    t.transform('primitive');
    t.end();
});

test('plugin-remove-useless-await: no transform: new', (t) => {
    t.noTransform('new');
    t.end();
});

