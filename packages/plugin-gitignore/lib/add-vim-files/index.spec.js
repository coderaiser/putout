'use strict';

const test = require('@putout/test')(__dirname, {
    'gitignore/add-vim-files': require('.'),
});

test('plugin-gitignore: add-vim-files: report', (t) => {
    t.report('gitignore', 'vim files should be added to .gitignore');
});

test('plugin-gitignore: transform', (t) => {
    t.transform('gitignore');
    t.end();
});

test('plugin-gitignore: no transform: present', (t) => {
    t.noTransform('present');
    t.end();
});

