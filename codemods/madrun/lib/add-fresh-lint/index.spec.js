import {createTest} from '@putout/test';
import * as addFreshLint from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-fresh-lint', addFreshLint],
    ],
});

test('madrun: add fresh:lint: report: lint', (t) => {
    t.report('lint', 'fresh:lint should exist');
    t.end();
});

test('madrun: add fresh:lint: transform: lint', (t) => {
    t.transform('lint');
    t.end();
});

test('madrun: add fresh:lint: transform: lint-esm', (t) => {
    t.transform('lint-esm');
    t.end();
});

test('madrun: add fresh:lint: no transform: exists', (t) => {
    t.noTransform('exists');
    t.end();
});
