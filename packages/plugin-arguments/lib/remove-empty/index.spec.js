import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-empty', plugin],
    ],
});

test('arguments: remove-empty: report', (t) => {
    t.report('remove-empty', `Avoid empty arguments`);
    t.end();
});

test('arguments: remove-empty: transform', (t) => {
    t.transform('remove-empty');
    t.end();
});

test('arguments: remove-empty: report: nested', (t) => {
    t.report('nested', [
        `Avoid empty arguments`,
        `Avoid empty arguments`,
    ]);
    t.end();
});

test('arguments: remove-empty: transform: nested', (t) => {
    t.transform('nested');
    t.end();
});

test('arguments: remove-empty: no report: valid', (t) => {
    t.noReport('valid');
    t.end();
});

test('arguments: remove-empty: transform: outside', (t) => {
    t.transform('outside');
    t.end();
});

test('arguments: remove-empty: no report: other-error', (t) => {
    t.noReport('other-error');
    t.end();
});
