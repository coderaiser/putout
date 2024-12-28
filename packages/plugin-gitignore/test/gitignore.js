import {createTest} from '@putout/test';
import * as gitignore from '../lib/gitignore.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['gitignore', gitignore],
    ],
});

test('plugin-gitignore: report', (t) => {
    t.report('gitignore', `Add dotfiles to '.gitignore'`);
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
        dismiss: ['coverage'],
    });
    t.end();
});
