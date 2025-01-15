'use strict';

const {createTest} = require('@putout/test');

const removeMadrunFromGitignore = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['remove-madrun-from-gitignore', removeMadrunFromGitignore],
    ],
});

test('plugin-remove-madrun-from-gitignore: report', (t) => {
    t.report('gitignore', '.putoutcache should be removed from .gitignore');
    t.end();
});

test('plugin-remove-madrun-from-gitignore: transform', (t) => {
    t.transform('gitignore');
    t.end();
});

test('plugin-remove-madrun-from-gitignore: no transform: not-present', (t) => {
    t.noTransform('not-present');
    t.end();
});
