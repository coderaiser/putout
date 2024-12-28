'use strict';

const {createTest} = require('@putout/test');
const removeEmpty = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['remove-empty', removeEmpty],
    ],
});

test('plugin-remove-empty: complex: report: block', (t) => {
    t.report('not-function', 'Avoid useless empty blocks');
    t.end();
});

test('plugin-remove-empty: report: block', (t) => {
    t.report('pattern', 'Avoid empty patterns');
    t.end();
});

test('plugin-remove-empty: transform: block: function', (t) => {
    t.transform('function');
    t.end();
});

test('plugin-remove-empty: transform: block: not function', (t) => {
    t.transform('not-function');
    t.end();
});

test('plugin-remove-empty: transform: pattern', (t) => {
    t.transform('pattern', '\n');
    t.end();
});

test('plugin-remove-empty: transform: nested-pattern', (t) => {
    t.transform('nested-pattern');
    t.end();
});

test('plugin-remove-empty: transform: static-block', (t) => {
    t.transform('static-block');
    t.end();
});
