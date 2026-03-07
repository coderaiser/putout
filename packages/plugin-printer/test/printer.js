import {createTest} from '@putout/test';
import * as printer from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['printer', printer],
    ],
});

test('printer: transform: add-args', (t) => {
    t.transform('add-args');
    t.end();
});

test('printer: transform: apply-computed-print', (t) => {
    t.transform('apply-computed-print');
    t.end();
});

test('printer: apply-computed-print: transform: apply-breakline', (t) => {
    t.transform('apply-breakline');
    t.end();
});

test('printer: apply-computed-print: transform: apply-linebreak', (t) => {
    t.transform('apply-linebreak');
    t.end();
});

test('printer: apply-computed-print: transform: remove-args', (t) => {
    t.transform('remove-args');
    t.end();
});

test('plugin-printer: transform: declare', (t) => {
    t.transform('declare');
    t.end();
});

test('plugin-printer: transform: apply-types', (t) => {
    t.transform('apply-types');
    t.end();
});

test('plugin-printer: transform: remove-legacy-test-declaration', (t) => {
    t.transform('remove-legacy-test-declaration');
    t.end();
});

test('plugin-printer: transform: apply-create-test-url', (t) => {
    t.transform('apply-create-test-url');
    t.end();
});

test('plugin-printer: transform: remove-useless-maybe', (t) => {
    t.transform('remove-useless-maybe');
    t.end();
});

test('plugin-printer: transform: remove-trailing-spaces-from-type-checker', (t) => {
    t.transform('remove-trailing-spaces-from-type-checker');
    t.end();
});

test('plugin-printer: transform: add-missing-spaces-to-type-checker', (t) => {
    t.transform('add-missing-spaces-to-type-checker');
    t.end();
});

test('plugin-printer: transform: remove-useless-spaces-from-type-checker', (t) => {
    t.transform('remove-useless-spaces-from-type-checker');
    t.end();
});

test('plugin-printer: transform: check-type-passed-to-type-checker', (t) => {
    t.transform('check-type-passed-to-type-checker');
    t.end();
});

test('plugin-printer: transform: add-missing-tuples-to-type-checker', (t) => {
    t.transform('add-missing-tuples-to-type-checker');
    t.end();
});

test('plugin-printer: transform: remove-useless-tuples-from-type-checker', (t) => {
    t.transform('remove-useless-tuples-from-type-checker');
    t.end();
});

test('plugin-printer: transform: check-if-success-possible-in-type-checker', (t) => {
    t.transform('check-if-success-possible-in-type-checker');
    t.end();
});
