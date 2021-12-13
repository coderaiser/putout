'use strict';

const {createTest} = require('@putout/test');
const splitDestructuring = require('..');

const test = createTest(__dirname, {
    'split-destructuring': splitDestructuring,
});

test('plugin-split-destructuring: report', (t) => {
    t.report('destr', 'Avoid nested destructuring');
    t.end();
});

test('plugin-split-destructuring: transform', (t) => {
    t.transform('destr');
    t.end();
});

test('plugin-split-destructuring: transform: fn', (t) => {
    t.transform('fn');
    t.end();
});

