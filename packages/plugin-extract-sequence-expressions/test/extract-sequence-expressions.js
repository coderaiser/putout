'use strict';

const {createTest} = require('@putout/test');
const extractSequenceExpressions = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['extract-sequence-expressions', extractSequenceExpressions],
    ],
});

test('plugin-extract-sequence-expressions: report: sequence', (t) => {
    t.report('sequence', 'Avoid sequence expressions');
    t.end();
});

test('plugin-extract-sequence-expressions: transform: sequence', (t) => {
    t.transform('sequence');
    t.end();
});

test('plugin-extract-sequence-expressions: arrow', (t) => {
    t.transform('arrow');
    t.end();
});

test('plugin-extract-sequence-expressions: simple-arrow', (t) => {
    t.transform('simple-arrow');
    t.end();
});

test('plugin-extract-sequence-expressions: call', (t) => {
    t.transform('call');
    t.end();
});

test('plugin-extract-sequence-expressions: return', (t) => {
    t.transform('return');
    t.end();
});

test('plugin-extract-sequence-expressions: layers', (t) => {
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

test('plugin-extract-sequence-expressions: transform: call', (t) => {
    t.transform('call');
    t.end();
});

test('plugin-extract-sequence-expressions: no transform: while', (t) => {
    t.noTransform('while');
    t.end();
});

test('plugin-extract-sequence-expressions: transform: await', (t) => {
    t.transform('await');
    t.end();
});

test('plugin-extract-sequence-expressions: transform: if', (t) => {
    t.transform('if');
    t.end();
});
