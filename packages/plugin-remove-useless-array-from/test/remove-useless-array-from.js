'use strict';

const removeUselessArrayFrom = require('..');

const test = require('@putout/test')(__dirname, {
    'remove-useless-array-from': removeUselessArrayFrom,
});

test('plugin-remove-useless-array-from: report', (t) => {
    t.report('array-from', '"Array.from" has no sense inside for-of');
    t.end();
});

test('plugin-remove-useless-array-from: transform', (t) => {
    t.transform('array-from');
    t.end();
});
