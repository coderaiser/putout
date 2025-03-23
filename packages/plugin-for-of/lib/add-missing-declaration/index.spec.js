import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-missing-declaration', plugin],
    ],
});

test('for-of: add-missing-declaration: report', (t) => {
    t.report('add-missing-declaration', `Add missing declaration`);
    t.end();
});

test('for-of: add-missing-declaration: transform', (t) => {
    t.transform('add-missing-declaration');
    t.end();
});

test('for-of: add-missing-declaration: no report: declared', (t) => {
    t.noReport('declared');
    t.end();
});

test('for-of: add-missing-declaration: no report: computed', (t) => {
    t.noReport('computed');
    t.end();
});

test('for-of: add-missing-declaration: transform: pattern', (t) => {
    t.transform('pattern');
    t.end();
});
