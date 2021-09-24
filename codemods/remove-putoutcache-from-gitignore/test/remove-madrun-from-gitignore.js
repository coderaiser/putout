'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-madrun-from-gitignore': require('..'),
});

test('plugin-remove-madrun-from-gitignore: report', (t) => {
    t.report('gitignore', '.putoutcache should be removed from .gitignore');
    t.end();
});

test('plugin-remove-madrun-from-gitignore: transform', (t) => {
    t.transform('gitignore');
    t.end();
});

test('plugin-remove-madrun-from-gitignore: no transform: present', (t) => {
    t.noTransform('not-present');
    t.end();
});

