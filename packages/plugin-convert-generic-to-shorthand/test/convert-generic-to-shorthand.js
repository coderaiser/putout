'use strict';

const {createTest} = require('@putout/test');
const convertGenericToShorthand = require('..');

const test = createTest(__dirname, {
    'convert-generic-to-shorthand': convertGenericToShorthand,
});

test('plugin-convert-generic-to-shorthand: report', (t) => {
    t.report('array', 'Shorthand [] should be used instead of Array');
    t.end();
});

test('plugin-convert-generic-to-shorthand: transform: array', (t) => {
    t.transform('array');
    t.end();
});

test('plugin-convert-generic-to-shorthand: no transform: multiple', (t) => {
    t.noTransform('multiple');
    t.end();
});

test('plugin-convert-generic-to-shorthand: no transform: no-generic', (t) => {
    t.noTransform('no-generic');
    t.end();
});

