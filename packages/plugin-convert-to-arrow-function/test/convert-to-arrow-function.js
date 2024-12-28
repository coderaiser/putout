'use strict';

const {createTest} = require('@putout/test');
const convertToArrowFunction = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['convert-to-arrow-function', convertToArrowFunction],
    ],
});

test('plugin-convert-to-arrow-function: report', (t) => {
    t.report('fn', 'Use arrow function');
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

test('plugin-convert-to-arrow-function: transform: arg', (t) => {
    t.transform('arg');
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
