'use strict';

const {createTest} = require('@putout/test');

const removeMadrunFromGitignore = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-madrun-from-gitignore', removeMadrunFromGitignore],
    ],
});

test('codemod-remove-madrun-form-gitignore: report', (t) => {
    t.report('gitignore', 'legacy should be removed from .gitignore');
    t.end();
});

test('codemod-remove-madrun-from-gitignore: transform', (t) => {
    t.transform('gitignore');
    t.end();
});

test('codemod-remove-madrun-from-gitignore: no transform: present', (t) => {
    t.noTransform('not-present');
    t.end();
});
