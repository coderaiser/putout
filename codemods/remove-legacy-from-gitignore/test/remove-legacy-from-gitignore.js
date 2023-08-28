import {createTest} from '@putout/test';
import * as removeLegacyFromGitignore from '../lib/remove-legacy-from-gitignore.js';

const test = createTest(import.meta.url, {
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
