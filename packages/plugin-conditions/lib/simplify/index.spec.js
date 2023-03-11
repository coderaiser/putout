'use strict';

const {createTest} = require('@putout/test');
const simplify = require('.');

const test = createTest(__dirname, {
    'conditions/simplify': simplify,
});

test('plugin-conditions: simplify: report', (t) => {
    t.report('conditions', 'Avoid useless conditions');
    t.end();
});

test('plugin-conditions: simplify: transform: array', (t) => {
    t.transform('conditions');
    t.end();
});

test('plugin-conditions: simplify: transform: duplicate', (t) => {
    t.transform('duplicate');
    t.end();
});

