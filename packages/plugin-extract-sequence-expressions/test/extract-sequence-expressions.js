'use strict';

const extractSequenceExpressions = require('..');

const test = require('@putout/test')(__dirname, {
    'extract-sequence-expressions': extractSequenceExpressions,
});

test('plugin-extract-sequence-expressions: report', (t) => {
    t.report('sequence', 'Sequence expressions should not be used');
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
