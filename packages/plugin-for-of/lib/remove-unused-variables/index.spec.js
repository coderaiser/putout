import {createTest} from '@putout/test';
import * as removeEmpty from '@putout/plugin-remove-empty';
import * as removeUnusedForOfVariables from './index.js';
import * as removeUselessVariables from '../remove-useless-variables/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-unused-for-of-variables', removeUnusedForOfVariables],
    ],
});

test('remove unused for-of-variables: report: object', (t) => {
    t.report('object', `'b' inside 'for...of' loop defined but never used`);
    t.end();
});

test('remove unused for-of-variables: report: array', (t) => {
    t.report('array', `'b' inside 'for...of' loop defined but never used`);
    t.end();
});

test('remove unused for-of-variables: transform: object', (t) => {
    t.transform('object');
    t.end();
});

test('remove unused for-of-variables: transform: array', (t) => {
    t.transform('array');
    t.end();
});

test('remove unused for-of-variables: no transform: identifier', (t) => {
    t.noTransform('identifier');
    t.end();
});

test('remove unused for-of-variables: transform: object: object-one', (t) => {
    t.transform('object-one');
    t.end();
});

test('remove unused for-of-variables: transform: array: array-one', (t) => {
    t.transform('array-one');
    t.end();
});

test('remove unused for-of-variables: no transform: referenced', (t) => {
    t.noTransform('referenced');
    t.end();
});

test('remove unused for-of-variables: transform: array-sparse', (t) => {
    t.transform('array-sparse');
    t.end();
});

test('remove unused for-of-variables: no transform: spread', (t) => {
    t.noTransform('spread');
    t.end();
});

test('remove unused for-of-variables: transform: for-of', (t) => {
    t.transform('for-of', {
        'remove-useless-variables/for-of': removeUselessVariables,
    });
    t.end();
});

test('remove unused for-of-variables: transform: remove-empty', (t) => {
    t.transform('remove-empty', {
        removeEmpty,
    });
    t.end();
});

test('remove unused for-of-variables: transform: entries', (t) => {
    t.transform('entries');
    t.end();
});
