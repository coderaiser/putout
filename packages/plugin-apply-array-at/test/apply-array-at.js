'use strict';

const {createTest} = require('@putout/test');
const applyArrayAt = require('..');

const test = createTest(__dirname, {
    'apply-array-at': applyArrayAt,
});

test('plugin-apply-array-at: transform: report', (t) => {
    t.report('array', `Use 'Array.at()'`);
    t.end();
});

test('plugin-apply-array-at: transform: object', (t) => {
    t.transform('array');
    t.end();
});

test('plugin-apply-array-at: no transform: assignment', (t) => {
    t.noTransform('assignment');
    t.end();
});

