'use strict';

const removeUselessArrayConstructor = require('..');

const test = require('@putout/test')(__dirname, {
    'remove-useless-array-constructor': removeUselessArrayConstructor,
});

test('plugin-remove-useless-array-constructor: report', (t) => {
    t.report('array', 'Array constructor should be avoided');
    t.end();
});

test('plugin-remove-useless-array-constructor: transform', (t) => {
    t.transform('array');
    t.end();
});

test('plugin-remove-useless-array-constructor: transform: of', (t) => {
    t.transform('of');
    t.end();
});

