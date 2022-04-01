'use strict';

const {createTest} = require('@putout/test');
const removeDuplicatesFromUnion = require('.');

const test = createTest(__dirname, {
    'remove-duplicates-from-union': removeDuplicatesFromUnion,
});

test('plugin-remove-duplicates-from-union: report', (t) => {
    t.report('union', 'Avoid using duplicates in Union');
    t.end();
});

test('plugin-remove-duplicates-from-union: transform: union', (t) => {
    t.transform('union');
    t.end();
});

test('plugin-remove-duplicates-from-union: transform: object', (t) => {
    t.report('object', ['Avoid using duplicates in Union']);
    t.end();
});

