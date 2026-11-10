import {createTest} from '@putout/test';
import * as typeChecker from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['type-checker', typeChecker],
    ],
});

test('type-checker: transform: remove-trailing-spaces-from-type-checker', (t) => {
    t.transform('remove-trailing-spaces-from-type-checker');
    t.end();
});

test('type-checker: transform: add-missing-spaces-to-type-checker', (t) => {
    t.transform('add-missing-spaces-to-type-checker');
    t.end();
});

test('type-checker: transform: remove-useless-spaces-from-type-checker', (t) => {
    t.transform('remove-useless-spaces-from-type-checker');
    t.end();
});

test('type-checker: transform: check-type-passed-to-type-checker', (t) => {
    t.transform('check-type-passed-to-type-checker');
    t.end();
});

test('type-checker: transform: add-missing-tuples-to-type-checker', (t) => {
    t.transform('add-missing-tuples-to-type-checker');
    t.end();
});

test('type-checker: transform: remove-useless-tuples-from-type-checker', (t) => {
    t.transform('remove-useless-tuples-from-type-checker');
    t.end();
});

test('type-checker: transform: merge-tuples-of-type-checkers', (t) => {
    t.transform('merge-tuples-of-type-checkers');
    t.end();
});

test('type-checker: transform: add-missing-colon-to-type-checker', (t) => {
    t.transform('add-missing-colon-to-type-checker');
    t.end();
});

test('type-checker: transform: remove-useless-colon-from-type-checker', (t) => {
    t.transform('remove-useless-colon-from-type-checker');
    t.end();
});

test('type-checker: transform: remove-useless-not-from-type-checker', (t) => {
    t.transform('remove-useless-not-from-type-checker');
    t.end();
});

test('type-checker: transform: reverse-comparison-in-type-checker', (t) => {
    t.transform('reverse-comparison-in-type-checker');
    t.end();
});

test('type-checker: transform: remove-useless-path-from-type-checker', (t) => {
    t.transform('remove-useless-path-from-type-checker');
    t.end();
});

test('type-checker: transform: remove-useless-arrow-from-type-checker', (t) => {
    t.transform('remove-useless-arrow-from-type-checker');
    t.end();
});

test('type-checker: transform: add-missing-arrow-to-type-checker', (t) => {
    t.transform('add-missing-arrow-to-type-checker');
    t.end();
});

test('type-checker: transform: apply-boolean-operator-to-type-checker', (t) => {
    t.transform('apply-boolean-operator-to-type-checker');
    t.end();
});
