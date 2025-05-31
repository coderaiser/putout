import {createTest} from '@putout/test';
import * as removeNestedPattern from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-empty/nested-pattern', removeNestedPattern],
    ],
});

test('plugin-remove-empty: nested-pattern: report', (t) => {
    t.report('nested-pattern', 'Avoid empty nested patterns');
    t.end();
});

test('plugin-remove-empty: nested-pattern: transform', (t) => {
    t.transform('nested-pattern');
    t.end();
});

test('plugin-remove-empty: nested-pattern: transform: array', (t) => {
    t.transform('array');
    t.end();
});

test('plugin-remove-empty: nested-pattern: no transform: not-empty-array', (t) => {
    t.noTransform('not-empty-array');
    t.end();
});

test('plugin-remove-empty: nested-pattern: no report: not-nested', (t) => {
    t.noReport('not-nested');
    t.end();
});
