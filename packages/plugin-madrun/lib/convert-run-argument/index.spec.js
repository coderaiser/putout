'use strict';

const {createTest} = require('@putout/test');
const convertRunArgument = require('.');

const test = createTest(__dirname, {
    'madrun/convert-run-argument': convertRunArgument,
});

test('madrun: convert run argument: report', (t) => {
    t.report('run', 'First "run" argument should be string, if it is single');
    t.end();
});

test('madrun: convert run argument: transform: run', (t) => {
    t.transform('run');
    t.end();
});

test('madrun: convert run argument: no transform: run more', (t) => {
    t.noTransform('run-more');
    t.end();
});

test('madrun: convert run argument: no transform: not-run', (t) => {
    t.noTransform('not-run');
    t.end();
});

