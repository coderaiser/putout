'use strict';

const {createTest} = require('@putout/test');
const addRun = require('.');

const strictMode = require('@putout/plugin-strict-mode');
const removeUnusedExpressions = require('@putout/plugin-remove-unused-expressions');
const test = createTest(__dirname, {
    'add-run': addRun,
});

const {'add-missing': addMissing} = strictMode.rules;

test('madrun: add run: report', (t) => {
    t.report('no-run', 'run should be declared');
    t.end();
});

test('madrun: add run: transform: no exists', (t) => {
    t.transform('no-run');
    t.end();
});

test('madrun: add run: no transform: exists', (t) => {
    t.noTransform('run');
    t.end();
});

test('madrun: add run: no transform: no run used', (t) => {
    t.noTransform('no-run-used');
    t.end();
});

test('madrun: add run: transform: strict', (t) => {
    t.transform('strict', {
        addMissing,
        removeUnusedExpressions,
    });
    t.end();
});

