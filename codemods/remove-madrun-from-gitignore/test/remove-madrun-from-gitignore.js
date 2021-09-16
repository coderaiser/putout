'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-madrun-from-gitignore': require('..'),
});

test('codemod-remove-madrun-form-gitignore: report', (t) => {
    t.report('gitignore', 'legacy should be removed from .gitignore');
});

test('codemod-remove-madrun-from-gitignore: transform', (t) => {
    t.transform('gitignore');
    t.end();
});

test('codemod-remove-madrun-from-gitignore: no transform: present', (t) => {
    t.noTransform('not-present');
    t.end();
});

