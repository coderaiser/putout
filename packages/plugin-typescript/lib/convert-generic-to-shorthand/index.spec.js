'use strict';

const {createTest} = require('@putout/test');
const convertGenericToShorthand = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['typescript/convert-generic-to-shorthand', convertGenericToShorthand],
    ],
});

test('plugin-typescript: convert-generic-to-shorthand: report', (t) => {
    t.report('array', `Use shorthand '[]' instead of generic 'Array'`);
    t.end();
});

test('plugin-typescript: convert-generic-to-shorthand: transform: array', (t) => {
    t.transform('array');
    t.end();
});

test('plugin-typescript: convert-generic-to-shorthand: transform: multiple', (t) => {
    t.transform('multiple');
    t.end();
});

test('plugin-typescript: convert-generic-to-shorthand: transform: fn', (t) => {
    t.transform('fn');
    t.end();
});

test('plugin-typescript: convert-generic-to-shorthand: transform: overlap', (t) => {
    t.transform('overlap');
    t.end();
});

test('plugin-typescript: convert-generic-to-shorthand: no transform: no-generic', (t) => {
    t.noTransform('no-generic');
    t.end();
});
