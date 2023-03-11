'use strict';

const {createTest} = require('@putout/test');
const removeConstant = require('.');

const test = createTest(__dirname, {
    'remove-constant': removeConstant,
});

test('plugin-conditions: remove-constant: report', (t) => {
    t.report('positive', 'Avoid constant conditions');
    t.end();
});

test('plugin-conditions: remove-constant: transform: positive', (t) => {
    t.transform('positive');
    t.end();
});

test('plugin-conditions: remove-constant: transform: negative', (t) => {
    t.transform('negative', '\n');
    t.end();
});

test('plugin-conditions: remove-constant: no transform: identifier', (t) => {
    t.noTransform('identifier');
    t.end();
});

test('plugin-conditions: remove-constant: transform: else', (t) => {
    t.transform('else');
    t.end();
});

test('plugin-conditions: remove-constant: transform: else if', (t) => {
    t.transform('else-if');
    t.end();
});

test('plugin-conditions: remove-constant: transform: same', (t) => {
    t.transform('same');
    t.end();
});

test('plugin-conditions: remove-constant: transform: no-body', (t) => {
    t.transform('no-body');
    t.end();
});
