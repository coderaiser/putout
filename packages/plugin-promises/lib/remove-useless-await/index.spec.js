'use strict';

const {createTest} = require('@putout/test');
const removeUselessAwait = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-useless-await', removeUselessAwait],
    ],
});

test('plugin-promises: remove-useless-await: report', (t) => {
    t.report('await-await', `Avoid useless 'await'`);
    t.end();
});

test('plugin-promises: remove-useless-await: transform', (t) => {
    t.transform('await-await');
    t.end();
});

test('plugin-promises: remove-useless-await: transform: not async', (t) => {
    t.transform('not-async');
    t.end();
});

test('plugin-promises: remove-useless-await: no transform: no call', (t) => {
    t.noTransform('no-call');
    t.end();
});

test('plugin-promises: remove-useless-await: no transform: no declaration', (t) => {
    t.noTransform('no-declaration');
    t.end();
});

test('plugin-promises: remove-useless-await: no transform: promise', (t) => {
    t.noTransform('promise');
    t.end();
});

test('plugin-promises: remove-useless-await: no transform: resolve', (t) => {
    t.noTransform('resolve');
    t.end();
});

test('plugin-promises: remove-useless-await: no transform: not fn', (t) => {
    t.noTransform('not-fn');
    t.end();
});

test('plugin-promises: remove-useless-await: no transform: callee not identifier', (t) => {
    t.noTransform('callee-not-identifier');
    t.end();
});

test('plugin-promises: remove-useless-await: transform: type-promise', (t) => {
    t.transform('type-promise');
    t.end();
});

test('plugin-promises: remove-useless-await: transform: primitive', (t) => {
    t.transform('primitive');
    t.end();
});

test('plugin-promises: remove-useless-await: no transform: optional', (t) => {
    t.noTransform('optional');
    t.end();
});

test('plugin-promises: remove-useless-await: no transform: new', (t) => {
    t.noTransform('new');
    t.end();
});

test('plugin-promises: remove-useless-await: no transform: expression', (t) => {
    t.noTransform('expression');
    t.end();
});

test('plugin-promises: remove-useless-await: no transform: member-expression', (t) => {
    t.noTransform('member-expression');
    t.end();
});

test('plugin-promises: remove-useless-await: no transform: logical', (t) => {
    t.noTransform('logical');
    t.end();
});

test('plugin-promises: remove-useless-await: no transform: import-expression', (t) => {
    t.noTransform('import-expression');
    t.end();
});

test('plugin-promises: remove-useless-await: no transform: optional-chaining', (t) => {
    t.noTransform('optional-chaining');
    t.end();
});
