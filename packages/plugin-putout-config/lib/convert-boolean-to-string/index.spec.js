'use strict';

const {createTest} = require('@putout/test');
const convertBooleanToString = require('.');

const test = createTest(__dirname, {
    'putout-config/convert-boolean-to-string': convertBooleanToString,
});

test('plugin-putout-config: convert-boolean-to-string: report', (t) => {
    t.report('bool', 'String should be used instead of Boolean');
    t.end();
});

test('plugin-putout-config: convert-boolean-to-string: transform: bool', (t) => {
    t.transform('bool');
    t.end();
});

test('plugin-putout-config: convert-boolean-to-string: transform: match', (t) => {
    t.transform('match');
    t.end();
});

test('plugin-putout-config: convert-boolean-to-string: transform: tuple', (t) => {
    t.transform('tuple');
    t.end();
});

test('plugin-putout-config: convert-boolean-to-string: no transform: options', (t) => {
    t.noTransform('options');
    t.end();
});

