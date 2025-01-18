'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['promises/convert-new-promise-to-async', convert],
    ],
});

test('plugin-promises: convert-new-promise-to-async: exports: report: new-promise', (t) => {
    t.report('new-promise', `Async functions should be used instead of 'new Promise()'`);
    t.end();
});

test('plugin-promises: convert-new-promise-to-async: transform: new-promise', (t) => {
    t.transform('new-promise');
    t.end();
});

test('plugin-promises: convert-new-promise-to-async: transform: resolve', (t) => {
    t.transform('resolve');
    t.end();
});

test('plugin-promises: convert-new-promise-to-async: no transform: reject', (t) => {
    t.noTransform('reject');
    t.end();
});

test('plugin-promises: convert-new-promise-to-async: transform: callback', (t) => {
    t.transform('callback');
    t.end();
});

test('plugin-promises: convert-new-promise-to-async: transform: arrow', (t) => {
    t.transform('arrow');
    t.end();
});

test('plugin-promises: convert-new-promise-to-async: no report: different-scopes', (t) => {
    t.noReport('different-scopes');
    t.end();
});

test('plugin-promises: convert-new-promise-to-async: no report: different-names', (t) => {
    t.noReport('different-names');
    t.end();
});

test('plugin-promises: convert-new-promise-to-async: no report: resolve-passed', (t) => {
    t.noReport('resolve-passed');
    t.end();
});

test('plugin-promises: convert-new-promise-to-async: no report: resolve-not-called', (t) => {
    t.noReport('resolve-not-called');
    t.end();
});
