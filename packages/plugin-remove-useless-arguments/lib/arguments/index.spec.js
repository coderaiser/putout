'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-useless-arguments/arguments': require('.'),
});

test('plugin-remove-useless-arguments: report', (t) => {
    t.report('arg', 'Argument "callback" is useless');
    t.end();
});

test('plugin-remove-useless-arguments: transform: arg', (t) => {
    t.transform('arg');
    t.end();
});

test('plugin-remove-useless-arguments: transform: var', (t) => {
    t.transform('var');
    t.end();
});

test('plugin-remove-useless-arguments: transform: no args', (t) => {
    t.noTransform('no-args');
    t.end();
});

test('plugin-remove-useless-arguments: no transform: not fn', (t) => {
    t.noTransform('not-fn');
    t.end();
});

test('plugin-remove-useless-arguments: no transform: not fn', (t) => {
    t.noTransform('spread');
    t.end();
});

