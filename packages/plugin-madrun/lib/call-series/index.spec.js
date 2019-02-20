'use strict';

/* eslint node/no-unpublished-require:0 */
const test = require('@putout/test')(__dirname, {
    'call-series': require('.')
});

test('madrun: call series: report', (t) => {
    t.report('redrun', '"series" should be called in script: "lint"');
    t.end();
});

test('madrun: call series: transform: redrun', (t) => {
    t.transform('redrun');
    t.end();
});

test('madrun: call series: transform: redrun: args', (t) => {
    t.transform('redrun-args');
    t.end();
});

test('madrun: call series: transform: npm: args', (t) => {
    t.transform('npm-args');
    t.end();
});

