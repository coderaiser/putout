'use strict';

const {createTest} = require('@putout/test');
const convertArgumentsToRest = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['convert-arguments-to-rest', convertArgumentsToRest],
    ],
});

test('plugin-convert-arguments-to-rest: report', (t) => {
    t.report('arguments', `Use 'rest parameters' instead of 'arguments'`);
    t.end();
});

test('plugin-convert-arguments-to-rest: transform', (t) => {
    t.transform('arguments');
    t.end();
});

test('plugin-convert-arguments-to-rest: transform: args exists', (t) => {
    t.transform('args');
    t.end();
});

test('plugin-convert-arguments-to-rest: transform: params', (t) => {
    t.transform('params');
    t.end();
});

test('plugin-convert-arguments-to-rest: transform: iife', (t) => {
    t.transform('iife');
    t.end();
});
