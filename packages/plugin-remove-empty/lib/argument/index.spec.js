'use strict';

const {createTest} = require('@putout/test');
const removeEmptyArgument = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-empty-argument', removeEmptyArgument],
    ],
});

test('plugin-remove-empty: argument: report', (t) => {
    t.report('arg', 'Avoid empty destructuring argument');
    t.end();
});

test('plugin-remove-empty: transform: argument: object', (t) => {
    t.transform('arg');
    t.end();
});

test('plugin-remove-empty: transform: argument: array', (t) => {
    t.transform('array');
    t.end();
});

test('plugin-remove-empty: transform: argument: object-method', (t) => {
    t.transform('object-method');
    t.end();
});

test('plugin-remove-empty: transform: argument: assign', (t) => {
    t.transform('assign');
    t.end();
});
