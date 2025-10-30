import {createTest} from '@putout/test';
import * as removeDuplicateKeys from '../lib/remove-duplicate-keys.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-duplicate-keys', removeDuplicateKeys],
    ],
});

test('remove duplicate-keys: report: duplicate', (t) => {
    t.report('duplicate', 'Avoid duplicate keys');
    t.end();
});

test('remove duplicate-keys: transform: condition', (t) => {
    t.transform('condition');
    t.end();
});

test('remove duplicate-keys: transform: duplicate-literal', (t) => {
    t.transform('duplicate-literal');
    t.end();
});

test('remove duplicate-keys: transform: spread', (t) => {
    t.transform('spread');
    t.end();
});

test('remove duplicate-keys: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});

test('remove duplicate-keys: transform: a-lot', (t) => {
    t.transform('a-lot');
    t.end();
});

test('remove duplicate-keys: no transform: extract', (t) => {
    t.noTransform('extract');
    t.end();
});

test('remove duplicate-keys: no transform: no-duplicate', (t) => {
    t.noTransform('no-duplicate');
    t.end();
});

test('remove duplicate-keys: no transform: rename', (t) => {
    t.noTransform('rename');
    t.end();
});

test('remove duplicate-keys: transform: member', (t) => {
    t.transform('member');
    t.end();
});

test('remove duplicate-keys: transform: array', (t) => {
    t.transform('array');
    t.end();
});

test('remove duplicate-keys: transform: object-pattern', (t) => {
    t.transform('object-pattern');
    t.end();
});

test('remove duplicate-keys: no report: object-pattern-rename', (t) => {
    t.noReport('object-pattern-rename');
    t.end();
});

test('remove duplicate-keys: no report: call', (t) => {
    t.noReport('call');
    t.end();
});

test('remove duplicate-keys: no report: object-pattern-nested', (t) => {
    t.noReport('object-pattern-nested');
    t.end();
});

test('remove duplicate-keys: no report: as', (t) => {
    t.noReport('as');
    t.end();
});
