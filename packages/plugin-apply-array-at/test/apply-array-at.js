'use strict';

const applyArrayAt = require('..');

const test = require('@putout/test')(__dirname, {
    'apply-array-at': applyArrayAt,
});

test('plugin-apply-array-at: transform: report', (t) => {
    t.report('array', 'Should be used "Array.at"');
    t.end();
});

test('plugin-apply-array-at: transform: object', (t) => {
    t.transform('array');
    t.end();
});

