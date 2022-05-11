'use strict';

const {createTest} = require('@putout/test');
const removeCheckDuplicatesFromTest = require('.');

const test = createTest(__dirname, {
    'remove-check-duplicates-from-test': removeCheckDuplicatesFromTest,
});

test('madrun: remove-check-duplicates-from-test: report', (t) => {
    t.report('check-duplicates', 'test: "-d" can be removed, duplicates checked by default');
    t.end();
});

test('madrun: remove-check-duplicates-from-test: transform', (t) => {
    t.transform('check-duplicates');
    t.end();
});

test('madrun: remove-check-duplicates-from-test: no report: no -d', (t) => {
    t.noReport('no-check-duplicates');
    t.end();
});

test('madrun: remove-check-duplicates-from-test: no transform: no -d', (t) => {
    t.noTransform('no-check-duplicates');
    t.end();
});

