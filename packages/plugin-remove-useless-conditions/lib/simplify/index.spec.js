'use strict';

const {createTest} = require('@putout/test');
const removeUselessConditions = require('..');

const test = createTest(__dirname, {
    'remove-useless-conditions': removeUselessConditions,
});

test('plugin-remove-useless-conditions: simplify: report', (t) => {
    t.report('conditions', 'Avoid useless conditions');
    t.end();
});

test('plugin-remove-useless-conditions: simplify: transform: array', (t) => {
    t.transform('conditions');
    t.end();
});

test('plugin-remove-useless-conditions: simplify: transform: duplicate', (t) => {
    t.transform('duplicate');
    t.end();
});

