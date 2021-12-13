'use strict';

const {createTest} = require('@putout/test');
const convertArgumentsToRest = require('..');

const test = createTest(__dirname, {
    'convert-arguments-to-rest': convertArgumentsToRest,
});

test('plugin-convert-arguments-to-rest: report', (t) => {
    t.report('arguments', 'rest parameters should be used instead of "arguments"');
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

