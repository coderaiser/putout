'use strict';

const test = require('@putout/test')(__dirname, {
    'convert-for-each-to-for-of': require('..'),
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

test('plugin-convert-for-each-to-for-of: transform: not function', (t) => {
    t.noTransform('not-fn');
    t.end();
});

test('plugin-convert-for-each-to-for-of: transform: empty function', (t) => {
    t.noTransform('empty-fn');
    t.end();
});

test('plugin-convert-for-each-to-for-of: transform: parent function argument', (t) => {
    t.noTransform('parent-fn-arg');
    t.end();
});

test('plugin-convert-for-each-to-for-of: transform: not this', (t) => {
    t.noTransform('not-this');
    t.end();
});

test('plugin-convert-for-each-to-for-of: transform: var is bound', (t) => {
    t.noTransform('var');
    t.end();
});

test('plugin-convert-for-each-to-for-of: transform: var is bound in a function', (t) => {
    t.noTransform('var-fn');
    t.end();
});
