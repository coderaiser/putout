'use strict';

/* eslint node/no-unpublished-require:0 */
const test = require('@putout/test')(__dirname, {
    'convert-run-argument': require('.'),
});

test('madrun: convert run argument: report', (t) => {
    t.report('run', 'First "run" argument should be string, if it is single');
    t.end();
});

test('madrun: convert run argument: transform: run', (t) => {
    t.transform('run');
    t.end();
});

test('madrun: convert run argument: transform: run more', (t) => {
    t.noTransform('run-more');
    t.end();
});

test('madrun: convert run argument: transform: not-run', (t) => {
    t.noTransform('not-run');
    t.end();
});

