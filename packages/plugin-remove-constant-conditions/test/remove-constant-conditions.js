'use strict';

const {createTest} = require('@putout/test');
const removeConstantConditions = require('..');

const test = createTest(__dirname, {
    'remove-constant-conditions': removeConstantConditions,
});

test('plugin-remove-constant-conditions: report', (t) => {
    t.report('positive', 'Avoid constant conditions');
    t.end();
});

test('plugin-remove-constant-conditions: transform: positive', (t) => {
    t.transform('positive');
    t.end();
});

test('plugin-remove-constant-conditions: transform: negative', (t) => {
    t.transform('negative', '\n');
    t.end();
});

test('plugin-remove-constant-conditions: no transform: identifier', (t) => {
    t.noTransform('identifier');
    t.end();
});

test('plugin-remove-constant-conditions: transform: else', (t) => {
    t.transform('else');
    t.end();
});

test('plugin-remove-constant-conditions: transform: else if', (t) => {
    t.transform('else-if');
    t.end();
});

test('plugin-remove-constant-conditions: transform: same', (t) => {
    t.transform('same');
    t.end();
});

test('plugin-remove-constant-conditions: transform: no-body', (t) => {
    t.transform('no-body');
    t.end();
});
