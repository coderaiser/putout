'use strict';

const test = require('@putout/test')(__dirname, {
    'convert-binary-expression-to-boolean': require('..'),
});

test('plugin-convert-binary-expression-to-boolean: report', (t) => {
    t.report('binary', 'constant conditions should be avoided');
    t.end();
});

test('plugin-convert-binary-expression-to-boolean: transform: positive', (t) => {
    t.transform('binary');
    t.end();
});

test('plugin-convert-binary-expression-to-boolean: no transform: add', (t) => {
    t.noTransform('add');
    t.end();
});

test('plugin-convert-binary-expression-to-boolean: no transform: compare', (t) => {
    t.noTransform('compare');
    t.end();
});

test('plugin-convert-binary-expression-to-boolean: no transform: literal left', (t) => {
    t.noTransform('literal-left');
    t.end();
});

test('plugin-convert-binary-expression-to-boolean: no transform: literal right', (t) => {
    t.noTransform('literal-right');
    t.end();
});

test('plugin-convert-binary-expression-to-boolean: transform: same', (t) => {
    t.transform('same');
    t.end();
});

test('plugin-convert-binary-expression-to-boolean: no transform: bitwise', (t) => {
    t.noTransform('bitwise');
    t.end();
});

