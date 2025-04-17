import {createTest} from '@putout/test';
import * as removeUnusedTypes from './index.js';
import * as removeUselessTypes from '../remove-useless-types/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['typescript/remove-unused-types', removeUnusedTypes],
    ],
});

test('remove unused types: report: unused', (t) => {
    t.report('unused', '"Point" is defined but never used');
    t.end();
});

test('remove unused types: transform: unused', (t) => {
    t.transform('unused', '\n');
    t.end();
});

test('remove unused types: no transform: used', (t) => {
    t.noTransform('used');
    t.end();
});

test('remove unused types: no transform: not-defined', (t) => {
    t.noTransform('not-defined');
    t.end();
});

test('remove unused types: no transform: export', (t) => {
    t.noTransform('export');
    t.end();
});

test('remove unused types: no transform: export-named', (t) => {
    t.noTransform('export-named');
    t.end();
});

test('remove unused types: no transform: export-default', (t) => {
    t.noTransform('export-default');
    t.end();
});

test('remove unused types: no transform: export-default-object', (t) => {
    t.noTransform('export-default-object');
    t.end();
});

test('remove unused types: no transform: bubling', (t) => {
    t.noTransform('bubling');
    t.end();
});

test('remove unused types: transform: remove-useless-types', (t) => {
    t.transform('remove-useless-types', {
        'remove-useless-types': removeUselessTypes,
    });
    t.end();
});
