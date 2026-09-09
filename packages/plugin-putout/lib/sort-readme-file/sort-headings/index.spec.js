import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['sort-headings', plugin],
    ],
});

test('putout: plugin-putout: sort-readme-file: sort-heading: sort-headings: report', (t) => {
    t.report('sort-headings', `Sort 'contents'`);
    t.end();
});

test('putout: plugin-putout: sort-readme-file: sort-heading: sort-headings: transform', (t) => {
    t.transform('sort-headings');
    t.end();
});

test('putout: plugin-putout: sort-readme-file: sort-heading: sort-headings: no report: no-link', (t) => {
    t.noReport('no-link');
    t.end();
});

test('putout: plugin-putout: sort-readme-file: sort-heading: sort-headings: transform: last-arg-not-array', (t) => {
    t.transform('last-arg-not-array');
    t.end();
});

test('putout: plugin-putout: sort-readme-file: sort-heading: sort-headings: transform: empty-heading', (t) => {
    t.transform('empty-heading');
    t.end();
});

test('putout: plugin-putout: sort-readme-file: sort-heading: sort-headings: transform: no-args', (t) => {
    t.transform('no-args');
    t.end();
});

test('putout: plugin-putout: sort-readme-file: sort-heading: sort-headings: transform: locale-compare', (t) => {
    t.transform('locale-compare');
    t.end();
});

test('putout: plugin-putout: sort-readme-file: sort-heading: sort-headings: report: heading-3', (t) => {
    t.report('heading-3', `Avoid using rules with heading level more then 2: '### for-n' -> '## for-n'`);
    t.end();
});
