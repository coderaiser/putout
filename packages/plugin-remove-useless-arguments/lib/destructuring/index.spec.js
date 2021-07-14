'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-useless-arguments/destructuring': require('.'),
});

test('plugin-remove-useless-arguments: no report', (t) => {
    t.noReport('spread');
    t.end();
});

test('plugin-remove-useless-arguments: no transform: spread', (t) => {
    t.noTransform('spread');
    t.end();
});

test('plugin-remove-useless-arguments: no transform: method', (t) => {
    t.noTransform('method');
    t.end();
});

test('plugin-remove-useless-arguments: destructuring: no transform: function as argument', (t) => {
    t.noTransform('fn-as-arg');
    t.end();
});

test('plugin-remove-useless-arguments: destructuring: no transform: fn', (t) => {
    t.noTransform('fn');
    t.end();
});
