'use strict';

const {createTest} = require('@putout/test');
const declare = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['printer/add-args', declare],
    ],
});

test('plugin-printer: add-args: transform', (t) => {
    t.transform('add-args');
    t.end();
});

test('plugin-printer: add-args: transform: traverse', (t) => {
    t.transform('traverse');
    t.end();
});

test('plugin-printer: add-args: transform: store', (t) => {
    t.transform('store');
    t.end();
});

test('plugin-printer: add-args: transform: const', (t) => {
    t.transform('const');
    t.end();
});

test('plugin-printer: add-args: transform: semantics', (t) => {
    t.transform('semantics');
    t.end();
});

test('plugin-printer: add-args: no transform: three-args-no-object', (t) => {
    t.noTransform('three-args-no-object');
    t.end();
});
