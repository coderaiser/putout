import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['merge-assignment-expressions', plugin],
    ],
});

test('minify: merge-assignment-expressions: report', (t) => {
    t.report('merge-assignment-expressions', `Merge assignment expressions`);
    t.end();
});

test('minify: merge-assignment-expressions: no report: one', (t) => {
    t.noReport('one');
    t.end();
});

test('minify: merge-assignment-expressions: no report: no-assign', (t) => {
    t.noReport('no-assign');
    t.end();
});

test('minify: merge-assignment-expressions: no report: different', (t) => {
    t.noReport('different');
    t.end();
});

test('minify: merge-assignment-expressions: transform', (t) => {
    t.transform('merge-assignment-expressions');
    t.end();
});
