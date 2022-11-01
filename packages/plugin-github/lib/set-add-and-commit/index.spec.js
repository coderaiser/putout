'use strict';

const {createTest} = require('@putout/test');
const setAddAndCommit = require('.');

const test = createTest(__dirname, {
    'github/set-add-and-commit': setAddAndCommit,
});

test('plugin-github: set-set-add-and-commit: report', (t) => {
    t.report('set-add-and-commit', 'Latest version of EndBug/add-and-commit is missing');
    t.end();
});

test('plugin-github: set-set-add-and-commit: transform', (t) => {
    t.transform('set-add-and-commit');
    t.end();
});

test('plugin-github: set-set-add-and-commit: no report: latest', (t) => {
    t.noReport('latest');
    t.end();
});

test('plugin-github: set-set-add-and-commit: no report: more', (t) => {
    t.noReport('more');
    t.end();
});

