'use strict';

const {createTest} = require('@putout/test');
const nodejs = require('../..');
const declare = require('@putout/plugin-declare');
const add = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['strict-mode/add', add],
    ],
});

test('plugin-nodejs: strict-mode: add: report', (t) => {
    t.report('commonjs', `Add missing 'use strict' directive on top of CommonJS`);
    t.end();
});

test('plugin-nodejs: strict-mode: add: commonjs', (t) => {
    t.transform('commonjs');
    t.end();
});

test('plugin-strict-mode: add: strict', (t) => {
    t.noTransform('strict');
    t.end();
});

test('plugin-strict-mode: add: import', (t) => {
    t.noTransform('import');
    t.end();
});

test('plugin-strict-mode: add: no transform: flow', (t) => {
    t.noTransform('flow');
    t.end();
});

test('plugin-strict-mode: add: no transform: export-all', (t) => {
    t.noTransform('export-all');
    t.end();
});

test('plugin-strict-mode: add: no transform: top-level-await', (t) => {
    t.noTransform('top-level-await');
    t.end();
});

test('plugin-strict-mode: add: no report: no-export', (t) => {
    t.noReport('no-export');
    t.end();
});

test('plugin-strict-mode: add: module-exports', (t) => {
    t.transform('module-exports');
    t.end();
});

test('plugin-strict-mode: add: require', (t) => {
    t.transform('require');
    t.end();
});

test('plugin-strict-mode: add: await', (t) => {
    t.noTransform('await');
    t.end();
});

const testNodejs = createTest(__dirname, {
    printer: 'putout',
    rules: {
        'nodejs/convert-commonjs-to-esm': 'off',
    },
    plugins: [
        ['strict-mode/add', add],
    ],
});

testNodejs('plugin-strict-mode: add: nodejs', (t) => {
    t.transform('nodejs', {
        nodejs,
        declare,
    });
    t.end();
});
