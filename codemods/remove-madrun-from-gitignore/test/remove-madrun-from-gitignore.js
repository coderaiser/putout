'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-legacy-from-gitignore': require('..'),
});

test('plugin-gitignore: report', (t) => {
    t.report('gitignore', 'legacy should be removed from .gitignore');
});

test('plugin-gitignore: transform', (t) => {
    t.transform('gitignore');
    t.end();
});

test('plugin-gitignore: no transform: present', (t) => {
    t.noTransform('not-present');
    t.end();
});

