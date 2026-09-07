import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['sort-headings', plugin],
    ],
});

test('lib: sort-headings: report', (t) => {
    t.report('sort-headings', `Sort 'contents'`);
    t.end();
});

test('lib: sort-headings: transform', (t) => {
    t.transform('sort-headings');
    t.end();
});

test('lib: sort-headings: no report: no-link', (t) => {
    t.noReport('no-link');
    t.end();
});

test('lib: sort-headings: transform: last-arg-not-array', (t) => {
    t.transform('last-arg-not-array');
    t.end();
});

test('lib: sort-headings: transform: empty-heading', (t) => {
    t.transform('empty-heading');
    t.end();
});
