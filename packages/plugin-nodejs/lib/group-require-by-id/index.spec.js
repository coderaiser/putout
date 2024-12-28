'use strict';

const {createTest} = require('@putout/test');

const declareBeforeReference = require('@putout/plugin-declare-before-reference');
const reuseDuplicateInit = require('@putout/plugin-reuse-duplicate-init');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['group-require-by-id', plugin],
    ],
});

test('nodejs: group-require-by-id: report', (t) => {
    t.report('group-require-by-id', `Group require by id`);
    t.end();
});

test('nodejs: group-require-by-id: no report: grouped', (t) => {
    t.noReport('grouped');
    t.end();
});

test('nodejs: group-require-by-id: no report: not-top-level', (t) => {
    t.noReport('not-top-level');
    t.end();
});

test('nodejs: group-require-by-id: transform', (t) => {
    t.transform('group-require-by-id');
    t.end();
});

test('plugin-nodejs: group-require-by-id: no report after transform: declare-before-reference', (t) => {
    t.noReportAfterTransform('declare-before-reference', {
        'declare-before-reference': declareBeforeReference,
        'reuse-duplicate-init': reuseDuplicateInit,
    });
    t.end();
});
