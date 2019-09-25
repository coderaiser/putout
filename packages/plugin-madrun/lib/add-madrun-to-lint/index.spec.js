'use strict';

/* eslint node/no-unpublished-require:0 */
const test = require('@putout/test')(__dirname, {
    'add-madrun-to-lint': require('.'),
});

test('madrun: add madrun to lint: report', (t) => {
    t.report('lint', '"lint" should check "madrun.js"');
    t.end();
});

test('madrun: add madrun to lint: transform', (t) => {
    t.transform('lint');
    t.end();
});

test('madrun: add madrun to lint: transform: str', (t) => {
    t.transform('str');
    t.end();
});

test('madrun: add madrun to lint: transform: lib', (t) => {
    t.transform('lib');
    t.end();
});

test('madrun: add madrun to lint: no transform: array', (t) => {
    t.noTransform('array');
    t.end();
});

test('madrun: add madrun to lint: no transform: exist', (t) => {
    t.noTransform('exist');
    t.end();
});

test('madrun: add madrun to lint: no transform: um', (t) => {
    t.noTransform('um');
    t.end();
});

test('madrun: add madrun to lint: no transform: um: template', (t) => {
    t.noTransform('um-template');
    t.end();
});
