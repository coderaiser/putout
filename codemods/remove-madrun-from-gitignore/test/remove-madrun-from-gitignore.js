import {createTest} from '@putout/test';
import * as removeMadrunFromGitignore from '../lib/remove-legacy-from-gitignore.js';

const test = createTest(import.meta.url, {
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

test('codemod-remove-madrun-from-gitignore: no transform: not-present', (t) => {
    t.noTransform('not-present');
    t.end();
});
