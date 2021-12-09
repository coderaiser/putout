'use strict';

const convertToArrowFunction = require('..');

const test = require('@putout/test')(__dirname, {
    'convert-to-arrow-function': convertToArrowFunction,
});

test('plugin-convert-to-arrow-function: report', (t) => {
    t.report('fn', 'Arrow functions should be used');
    t.end();
});

test('plugin-convert-to-arrow-function: transform: fn', (t) => {
    t.transform('fn');
    t.end();
});

test('plugin-convert-to-arrow-function: transform: body', (t) => {
    t.transform('body');
    t.end();
});

test('plugin-convert-to-arrow-function: transform: return fn', (t) => {
    t.transform('return-fn');
    t.end();
});

test('plugin-convert-to-arrow-function: no transform: this', (t) => {
    t.noTransform('this');
    t.end();
});

test('plugin-convert-to-arrow-function: no transform: name', (t) => {
    t.noTransform('name');
    t.end();
});

test('plugin-convert-to-arrow-function: no transform: prototype', (t) => {
    t.noTransform('prototype');
    t.end();
});

