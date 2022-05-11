'use strict';

const {createTest} = require('@putout/test');
const convertForEachToForOf = require('..');

const convertComparisonToBoolean = require('@putout/plugin-convert-comparison-to-boolean');
const removeUselessVariables = require('@putout/plugin-remove-useless-variables');

const test = createTest(__dirname, {
    'convert-for-each-to-for-of': convertForEachToForOf,
});

test('plugin-convert-for-each-to-for-of: report', (t) => {
    t.report('keys', 'for-of should be used instead of forEach');
    t.end();
});

test('plugin-convert-for-each-to-for-of: transform', (t) => {
    t.transform('keys');
    t.end();
});

test('plugin-convert-for-each-to-for-of: transform: this', (t) => {
    t.transform('this');
    t.end();
});

test('plugin-convert-for-each-to-for-of: transform: return', (t) => {
    t.transform('return');
    t.end();
});

test('plugin-convert-for-each-to-for-of: transform: empty return', (t) => {
    t.transform('empty-return');
    t.end();
});

test('plugin-convert-for-each-to-for-of: no transform: not function', (t) => {
    t.noTransform('not-fn');
    t.end();
});

test('plugin-convert-for-each-to-for-of: no transform: empty function', (t) => {
    t.noTransform('empty-fn');
    t.end();
});

test('plugin-convert-for-each-to-for-of: no transform: parent function argument', (t) => {
    t.noTransform('parent-fn-arg');
    t.end();
});

test('plugin-convert-for-each-to-for-of: no transform: not this', (t) => {
    t.noTransform('not-this');
    t.end();
});

test('plugin-convert-for-each-to-for-of: transform: var not bound', (t) => {
    t.transform('not-bound');
    t.end();
});

test('plugin-convert-for-each-to-for-of: transform: call', (t) => {
    t.transform('call');
    t.end();
});

test('plugin-convert-for-each-to-for-of: transform: member-expression', (t) => {
    t.transform('member-expression');
    t.end();
});

test('plugin-convert-for-each-to-for-of: transform: inner-block', (t) => {
    t.transform('inner-block');
    t.end();
});

test('plugin-convert-for-each-to-for-of: no transform: var is bound', (t) => {
    t.noTransform('var');
    t.end();
});

test('plugin-convert-for-each-to-for-of: no transform: var is bound in a function', (t) => {
    t.noTransform('var-fn');
    t.end();
});

test('plugin-convert-for-each-to-for-of: no transform: if', (t) => {
    t.noTransform('if');
    t.end();
});

test('plugin-convert-for-each-to-for-of: no transform: i', (t) => {
    t.noTransform('i');
    t.end();
});

test('plugin-convert-for-each-to-for-of: no transform: same name', (t) => {
    t.noTransform('same-name');
    t.end();
});

test('plugin-convert-for-each-to-for-of: no transform: this i', (t) => {
    t.noTransform('this-i');
    t.end();
});

test('plugin-convert-for-each-to-for-of: transform: with convert-comparison-to-boolean', (t) => {
    t.transform('convert-comparison-to-boolean', {
        'convert-comparison-to-boolean': convertComparisonToBoolean,
        'remove-useless-variables': removeUselessVariables,
    });
    t.end();
});

