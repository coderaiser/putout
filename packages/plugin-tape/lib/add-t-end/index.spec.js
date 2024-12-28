'use strict';

const {createTest} = require('@putout/test');
const putout = require('@putout/plugin-putout');
const addTEnd = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['tape/add-t-end', addTEnd],
    ],
});

test('plugin-tape: add-t-end: report', (t) => {
    t.report('t-end', `'t.end()' is missing at the end of the test`);
    t.end();
});

test('plugin-tape: add-t-end: transform', (t) => {
    t.transform('t-end');
    t.end();
});

test('plugin-tape: add-t-end: transform: not-empty', (t) => {
    t.transform('not-empty');
    t.end();
});

test('plugin-tape: add-t-end: transform: async', (t) => {
    t.transform('async');
    t.end();
});

test('plugin-tape: add-t-end: no transform: async-operator', (t) => {
    t.noTransform('async-operator');
    t.end();
});

test('plugin-tape: add-t-end: no transform: putout', (t) => {
    t.transform('putout', {
        putout,
    });
    t.end();
});

test('plugin-tape: add-t-end: no transform: contains', (t) => {
    t.noTransform('contains');
    t.end();
});

test('plugin-tape: add-t-end: no report: callback', (t) => {
    t.noReport('callback');
    t.end();
});
