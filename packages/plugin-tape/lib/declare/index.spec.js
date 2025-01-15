'use strict';

const {createTest} = require('@putout/test');
const declare = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['tape/declare', declare],
    ],
});

test('plugin-tape: declare: report: test', (t) => {
    t.report('test', `Declare 'test', it referenced but not defined`);
    t.end();
});

test('plugin-tape: declare: transform: test', (t) => {
    t.transform('test');
    t.end();
});

test('plugin-tape: declare: transform: stub', (t) => {
    t.transform('stub');
    t.end();
});

test('plugin-tape: declare: transform: types', (t) => {
    t.transform('types');
    t.end();
});

test('plugin-tape: declare: declared', (t) => {
    t.noTransform('declared');
    t.end();
});

test('putout-tape: declare: transform: mock-import', (t) => {
    t.transform('mock-import');
    t.end();
});

test('plugin-tape: declare: transform: re-import', (t) => {
    t.transform('re-import');
    t.end();
});

test('plugin-tape: declare: transform: stop-all: stop-all-esm', (t) => {
    t.transform('stop-all-esm');
    t.end();
});

test('plugin-tape: declare: transform: stop-all: stop-all-commonjs', (t) => {
    t.transform('stop-all-commonjs');
    t.end();
});

test('plugin-tape: declare: transform: re-require', (t) => {
    t.transform('re-require');
    t.end();
});
