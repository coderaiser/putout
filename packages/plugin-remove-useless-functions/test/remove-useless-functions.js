'use strict';

const {createTest} = require('@putout/test');
const removeUselessFunctions = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['remove-useless-functions', removeUselessFunctions],
    ],
});

test('remove useless functions: report', (t) => {
    t.report('block', 'Avoid useless functions');
    t.end();
});

test('remove useless functions: transform: block', (t) => {
    t.transform('block');
    t.end();
});

test('remove useless functions: transform: fn', (t) => {
    t.transform('fn');
    t.end();
});

test('remove useless functions: transform: async', (t) => {
    t.transform('async');
    t.end();
});

test('remove useless functions: transform: bool', (t) => {
    t.transform('bool');
    t.end();
});

test('remove useless functions: transform: id', (t) => {
    t.transform('id');
    t.end();
});

test('remove useless functions: no transform: method', (t) => {
    t.noTransform('method');
    t.end();
});

test('remove useless functions: no transform: method block', (t) => {
    t.noTransform('method-block');
    t.end();
});

test('remove useless functions: no transform: different args', (t) => {
    t.noTransform('different-args');
    t.end();
});
