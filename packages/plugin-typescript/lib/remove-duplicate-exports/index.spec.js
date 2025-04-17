import {createTest} from '@putout/test';
import * as removeDuplicateExports from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-duplicate-exports', removeDuplicateExports],
    ],
});

test('typescript: remove-duplicate-exports: report: duplicate', (t) => {
    t.report('duplicate', 'Avoid duplicate exports');
    t.end();
});

test('typescript: remove-duplicate-exports: transform: duplicate', (t) => {
    t.transform('duplicate');
    t.end();
});

test('typescript: remove-duplicate-exports: no report: namespace', (t) => {
    t.noReport('namespace');
    t.end();
});
