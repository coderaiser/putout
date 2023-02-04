'use strict';

const {operator} = require('putout');

const {createTest} = require('@putout/test');

const removeDuplicatesFromUnion = require('.');
const noop = () => {};
const {remove} = operator;

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

test('plugin-remove-duplicates-from-union: report: object', (t) => {
    t.report('object', ['Avoid using duplicates in Union']);
    t.end();
});

test('plugin-remove-duplicates-from-union: transform: object', (t) => {
    t.transform('object');
    t.end();
});

test('plugin-remove-duplicates-from-union: transform: remove', (t) => {
    t.transform('remove', {
        remove: {
            report: noop,
            include: () => ['TSTypeLiteral'],
            fix: (path) => remove(path),
        },
    });
    t.end();
});

