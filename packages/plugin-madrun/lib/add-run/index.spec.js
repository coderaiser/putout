'use strict';

const strictMode = require('@putout/plugin-strict-mode');
const removeUnusedExpressions = require('@putout/plugin-remove-unused-expressions');
const test = require('@putout/test')(__dirname, {
    'add-run': require('.'),
});

const {add} = strictMode.rules;

test('madrun: add run: report', (t) => {
    t.report('no-run', 'run should be declared');
    t.end();
});

test('madrun: add run: no transform: no exists', (t) => {
    t.transform('no-run');
    t.end();
});

test('madrun: add run: transform: exists', (t) => {
    t.noTransform('run');
    t.end();
});

test('madrun: add run: transform: no run used', (t) => {
    t.noTransform('no-run-used');
    t.end();
});

test('madrun: add run: transform: strict', (t) => {
    t.transform('strict', {
        add,
        removeUnusedExpressions,
    });
    
    t.end();
});

