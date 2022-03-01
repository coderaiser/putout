'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');

const test = createTest(__dirname, {
    'madrun/add-cut-env': convert,
});

test('madrun: add-cut-env: report', (t) => {
    t.report('cut-env', `Call 'await cutEnv(script)' instead of 'script'`);
    t.end();
});

test('madrun: add-cut-env: transform', (t) => {
    t.transform('cut-env');
    t.end();
});

test('madrun: add-cut-env: no transform: run', (t) => {
    t.noTransform('run');
    t.end();
});

test('madrun: add-cut-env: no report: no property', (t) => {
    t.noReport('no-property');
    t.end();
});

test('madrun: add-cut-env: no report: no-export-default', (t) => {
    t.noReport('no-export-default');
    t.end();
});

