'use strict';

const test = require('@putout/test')(__dirname, {
    'extract-sequence-expressions': require('..'),
});

test('plugin-extract-sequence-expressions: report', (t) => {
    t.report('sequence', 'sequence expressions should not be used');
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

test('plugin-extract-sequence-expressions: transform call expression', (t) => {
    t.transform('call');
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
