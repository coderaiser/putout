import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['merge-tuples-of-type-checkers', plugin],
    ],
});

test('printer: merge-tuples-of-type-checkers: report', (t) => {
    t.report('merge-tuples-of-type-checkers', `Merge tuple of type checker`);
    t.end();
});

test('printer: merge-tuples-of-type-checkers: transform', (t) => {
    t.transform('merge-tuples-of-type-checkers');
    t.end();
});

test('printer: merge-tuples-of-type-checkers: transform: not-starts-with-is', (t) => {
    t.transform('not-starts-with-is');
    t.end();
});

test('printer: merge-tuples-of-type-checkers: transform: not-boolean', (t) => {
    t.transform('not-boolean');
    t.end();
});

test('printer: merge-tuples-of-type-checkers: transform: boolean-no-arrow', (t) => {
    t.transform('boolean-no-arrow');
    t.end();
});

test('printer: merge-tuples-of-type-checkers: transform: boolean-arrow', (t) => {
    t.transform('boolean-arrow');
    t.end();
});

test('printer: merge-tuples-of-type-checkers: no report: is', (t) => {
    t.noReport('is');
    t.end();
});
