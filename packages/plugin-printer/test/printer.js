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
