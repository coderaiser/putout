'use strict';

const {createTest} = require('@putout/test');
const mergeIfStatements = require('.');

const test = createTest(__dirname, {
    'merge-if-statements': mergeIfStatements,
});

test('plugin-merge-if-statements: report', (t) => {
    t.report('if', `Merge 'if' statements`);
    t.end();
});

test('plugin-merge-if-statements: transform: if', (t) => {
    t.transform('if');
    t.end();
});

test('plugin-merge-if-statements: no transform: else', (t) => {
    t.noTransform('else');
    t.end();
});

test('plugin-merge-if-statements: no transform: inner-else', (t) => {
    t.noTransform('inner-else');
    t.end();
});

test('plugin-merge-if-statements: transform: empty', (t) => {
    t.transform('empty');
    t.end();
});
