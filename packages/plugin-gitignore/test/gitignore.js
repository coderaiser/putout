'use strict';

const {createTest} = require('@putout/test');
const gitignore = require('..');

const test = createTest(__dirname, {
    gitignore,
});

test('plugin-gitignore: report', (t) => {
    t.report('gitignore', 'Dot files should be added to .gitignore');
    t.end();
});

test('plugin-gitignore: transform', (t) => {
    t.transform('gitignore');
    t.end();
});

test('plugin-gitignore: no transform: all presented', (t) => {
    t.noTransform('gitignore-fix');
    t.end();
});

test('plugin-gitignore: transform: vim-files', (t) => {
    t.transform('vim-files');
    t.end();
});

test('plugin-gitignore: transform: options', (t) => {
    t.transformWithOptions('options', {
        dismiss: [
            'coverage',
        ],
    });
    t.end();
});

