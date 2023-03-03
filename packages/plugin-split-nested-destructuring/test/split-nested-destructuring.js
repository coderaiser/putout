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

test('plugin-split-destructuring: transform: rename', (t) => {
    t.transform('rename');
    t.end();
});

test('plugin-split-destructuring: transform: default', (t) => {
    t.transform('default');
    t.end();
});

test('plugin-split-destructuring: transform: rename-assign', (t) => {
    t.transform('rename-assign');
    t.end();
});

test('plugin-split-destructuring: no transform: couple', (t) => {
    t.noTransform('couple');
    t.end();
});

test('plugin-split-destructuring: no transform: declared', (t) => {
    t.noTransform('declared');
    t.end();
});

test('plugin-split-destructuring: no transform: computed', (t) => {
    t.noTransform('computed');
    t.end();
});

