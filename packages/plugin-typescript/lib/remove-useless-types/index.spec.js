'use strict';

const {createTest} = require('@putout/test');
const removeUselessTypes = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['typescript/remove-useless-types', removeUselessTypes],
    ],
});

test('typescript: remove useless types: report', (t) => {
    t.report('types', 'Avoid useless type declaration');
    t.end();
});

test('typescript: remove useless types: transform', (t) => {
    t.transform('types');
    t.end();
});

test('typescript: remove useless types: transform: return', (t) => {
    t.transform('return');
    t.end();
});

test('typescript: remove useless types: transform: array', (t) => {
    t.transform('array');
    t.end();
});

test('typescript: remove useless types: no transform: generic', (t) => {
    t.noTransform('generic');
    t.end();
});

test('typescript: remove useless types: no transform: export', (t) => {
    t.noTransform('export');
    t.end();
});

test('typescript: remove useless types: no transform: qualified-name', (t) => {
    t.noTransform('qualified-name');
    t.end();
});
