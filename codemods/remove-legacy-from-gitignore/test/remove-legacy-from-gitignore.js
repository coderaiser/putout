'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-legacy-from-gitignore': require('..'),
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

