'use strict';

const removeCheckDuplicatesFromTest = require('.');

const test = require('@putout/test')(__dirname, {
    'remove-check-duplicates-from-test': removeCheckDuplicatesFromTest,
});

test('madrun: remove-check-duplicates-from-test: report', (t) => {
    t.report('check-duplicates', 'test: "-d" can be removed, duplicates checked by default');
    t.end();
});

test('madrun: remove-check-duplicates-from-test: no transform', (t) => {
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

