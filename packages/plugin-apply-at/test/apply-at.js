'use strict';

const {createTest} = require('@putout/test');
const applyArrayAt = require('..');

const test = createTest(__dirname, {
    'apply-at': applyArrayAt,
});

test('plugin-apply-at: transform: report', (t) => {
    t.report('array', `Use 'Array.at()'`);
    t.end();
});

test('plugin-apply-at: transform: object', (t) => {
    t.transform('array');
    t.end();
});

test('plugin-apply-at: no transform: assignment', (t) => {
    t.noTransform('assignment');
    t.end();
});

