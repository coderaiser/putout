'use strict';

const {createTest} = require('@putout/test');
const extractSequenceExpressions = require('..');

const test = createTest(__dirname, {
    'extract-sequence-expressions': extractSequenceExpressions,
});

test('plugin-extract-sequence-expressions: report', (t) => {
    t.report('sequence', 'Avoid sequence expressions');
    t.end();
});

test('plugin-extract-sequence-expressions: transform', (t) => {
    t.transform('sequence');
    t.end();
});

test('plugin-extract-sequence-expressions: transform arrow function', (t) => {
    t.transform('arrow');
    t.end();
});

test('plugin-extract-sequence-expressions: transform simple arrow function', (t) => {
    t.transform('simple-arrow');
    t.end();
});

test('plugin-extract-sequence-expressions: transform call expression', (t) => {
    t.transform('call');
    t.end();
});

test('plugin-extract-sequence-expressions: transform return', (t) => {
    t.transform('return');
    t.end();
});

test('plugin-extract-sequence-expressions: transform layers', (t) => {
    t.transform('layers');
    t.end();
});

test('plugin-extract-sequence-expressions: transform: args', (t) => {
    t.transform('args');
    t.end();
});

test('plugin-extract-sequence-expressions: transform: lost-arg', (t) => {
    t.transform('lost-arg');
    t.end();
});

test('plugin-extract-sequence-expressions: transform: assign', (t) => {
    t.transform('assign');
    t.end();
});

test('plugin-extract-sequence-expressions: no transform: for', (t) => {
    t.noTransform('for');
    t.end();
});

test('plugin-extract-sequence-expressions: no transform: while', (t) => {
    t.noTransform('while');
    t.end();
});

test('plugin-extract-sequence-expressions: no transform: await', (t) => {
    t.noTransform('await');
    t.end();
});
