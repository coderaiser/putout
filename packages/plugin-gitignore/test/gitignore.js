import {createTest} from '@putout/test';
import * as gitignore from '../lib/gitignore.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['gitignore', gitignore],
    ],
});

test('plugin-gitignore: report: gitignore', (t) => {
    t.report('gitignore', `Add '.idea' to '.gitignore'`);
    t.end();
});

test('plugin-gitignore: transform: gitignore', (t) => {
    t.transform('gitignore');
    t.end();
});

test('plugin-gitignore: no transform: gitignore-fix', (t) => {
    t.noTransform('gitignore-fix');
    t.end();
});

test('plugin-gitignore: transform: vim-files', (t) => {
    t.transform('vim-files');
    t.end();
});

test('plugin-gitignore: transform with options: options', (t) => {
    t.transformWithOptions('options', {
        dismiss: ['coverage'],
    });
    t.end();
});
