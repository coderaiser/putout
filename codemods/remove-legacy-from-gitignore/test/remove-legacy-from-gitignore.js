'use strict';

const {createTest} = require('@putout/test');

const removeLegacyFromGitignore = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-legacy-from-gitignore', removeLegacyFromGitignore],
    ],
});

test('codemod-remove-legacy-from-gitignore: report', (t) => {
    t.report('gitignore', 'legacy should be removed from .gitignore');
    t.end();
});

test('codemod-remove-legacy-from-gitignore: transform', (t) => {
    t.transform('gitignore');
    t.end();
});

test('codemod-remove-legacy-from-gitignore: no transform: present', (t) => {
    t.noTransform('not-present');
    t.end();
});
