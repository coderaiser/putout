'use strict';

const {createTest} = require('@putout/test');
const removeUselessArrayFrom = require('..');

const test = createTest(__dirname, {
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
