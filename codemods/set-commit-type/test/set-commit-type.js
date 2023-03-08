'use strict';

const {createTest} = require('@putout/test');
const setHomepage = require('..');
const test = createTest(__dirname, {
    'set-commit-type': setHomepage,
});

test('rules: set-commit-type: report', (t) => {
    t.report('commit-type', `Set 'commitType'`);
    t.end();
});

test('rules: set-commit-type: transform', (t) => {
    t.transform('commit-type');
    t.end();
});

test('rules: set-commit-type: no report: no-main', (t) => {
    t.noReport('no-main');
    t.end();
});

