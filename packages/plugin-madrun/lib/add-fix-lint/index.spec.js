import {createTest} from '@putout/test';
import * as addFixLint from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-fix-lint', addFixLint],
    ],
});

test('madrun: add fix:lint: report: lint', (t) => {
    t.report('lint', 'fix:lint should exist');
    t.end();
});

test('madrun: add fix:lint: transform: lint', (t) => {
    t.transform('lint');
    t.end();
});

test('madrun: add fix:lint: no transform: exists', (t) => {
    t.noTransform('exists');
    t.end();
});
